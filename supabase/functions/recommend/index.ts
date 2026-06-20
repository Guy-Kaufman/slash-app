// Slash — AI recommendation Edge Function.
//
// Deploy:  supabase functions deploy recommend
// Secret:  supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
//
// The Anthropic key lives only in the function's environment, never in the
// browser bundle. If the key is missing or the API errors, we return
// { recommendation: null } so the client falls back to its bundled text.

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')
const MODEL = 'claude-opus-4-8'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  if (!ANTHROPIC_API_KEY) return json({ recommendation: null })

  let sub: Record<string, unknown>
  try {
    sub = await req.json()
  } catch {
    return json({ recommendation: null }, 400)
  }

  const prompt = [
    'You are a financial assistant inside "Slash", an app that helps Israeli users',
    'cut wasteful subscriptions. Given one subscription, write ONE short, concrete',
    'recommendation (max 2 sentences, plain English) on whether to keep or cancel it',
    'and why. Mention the yearly saving in ₪ if cancelling makes sense. No preamble.',
    '',
    `Subscription: ${JSON.stringify(sub)}`,
  ].join('\n')

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 160,
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    if (!res.ok) return json({ recommendation: null })
    const data = await res.json()
    const text = data?.content?.[0]?.text ?? null
    return json({ recommendation: text })
  } catch {
    return json({ recommendation: null })
  }
})
