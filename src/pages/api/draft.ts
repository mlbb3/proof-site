// POST /api/draft: the one live thing on the page. The reader types an enquiry,
// Claude drafts a two-to-four sentence reply in the fictional owner's voice.
// Nothing is sent anywhere. Model, prompt and max_tokens are fixed here so the
// client cannot escalate cost. Per-IP limit in memory (per function instance)
// plus a monthly spend cap on the key in the Anthropic console as the backstop.
export const prerender = false;

import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';
import { TRADES, draftSystemPrompt } from '../../data/trades';

const MAX_CHARS = 300;
const PER_HOUR = 10;
const hits = new Map<string, { n: number; reset: number }>();

function limited(ip: string): boolean {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now > h.reset) {
    hits.set(ip, { n: 1, reset: now + 3600_000 });
    return false;
  }
  h.n += 1;
  return h.n > PER_HOUR;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return json({ error: 'resting' }, 503);

  let ip = 'unknown';
  try {
    ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'unknown';
  } catch {
    /* clientAddress can throw on some hosts; fall through to 'unknown' */
  }
  if (limited(ip)) return json({ error: 'limited' }, 429);

  let payload: { enquiry?: unknown; trade?: unknown; owner?: unknown; firm?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }
  const raw = typeof payload.enquiry === 'string' ? payload.enquiry : '';
  const enquiry = raw.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, MAX_CHARS);
  if (!enquiry) return json({ error: 'bad_request' }, 400);
  const trade = TRADES[typeof payload.trade === 'string' ? payload.trade : 'default'] ?? TRADES.default;
  // Optional names from the reader's link. Letters, digits and simple
  // punctuation only, short, so they can't carry instructions into the prompt.
  const clean = (v: unknown) =>
    typeof v === 'string' ? v.replace(/[^\p{L}\p{N} '&.,-]/gu, '').replace(/\s+/g, ' ').trim().slice(0, 30) : '';
  const who = { owner: clean(payload.owner), firm: clean(payload.firm) };

  const client = new Anthropic({ apiKey: key });
  try {
    const params = {
      model: 'claude-opus-5',
      max_tokens: 300,
      betas: ['server-side-fallback-2026-07-01'],
      output_config: { effort: 'low' as const },
      system: draftSystemPrompt(trade, who),
      messages: [{ role: 'user' as const, content: enquiry }],
    };
    // `fallbacks: "default"` routes a policy refusal to a fallback model inside
    // the same call. Spread onto a typed object so the non-streaming overload
    // (and its BetaMessage return type) is kept.
    const res = await client.beta.messages.create({ ...params, fallbacks: 'default' } as typeof params & { fallbacks: 'default' });
    if (res.stop_reason === 'refusal') return json({ error: 'refused' }, 502);
    const text = res.content
      .filter((b): b is Extract<(typeof res.content)[number], { type: 'text' }> => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim();
    if (!text) return json({ error: 'empty' }, 502);
    return json({ draft: text });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) return json({ error: 'limited' }, 429);
    return json({ error: 'upstream' }, 502);
  }
};

export const GET: APIRoute = () => json({ error: 'method' }, 405);
