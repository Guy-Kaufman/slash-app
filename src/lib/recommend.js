import { supabase } from './supabaseClient'

/**
 * Ask the `recommend` Supabase Edge Function for an AI-generated recommendation
 * for a single subscription. The function calls Claude server-side so the API
 * key never reaches the browser.
 *
 * Returns the recommendation string, or `null` when the function is unavailable
 * (not deployed / no key set) so callers can fall back to the bundled text.
 */
export async function fetchRecommendation(subscription) {
  try {
    const { data, error } = await supabase.functions.invoke('recommend', {
      body: {
        name: subscription.name,
        plan: subscription.plan,
        category: subscription.category,
        amount: subscription.amount,
        yearlyCost: subscription.yearlyCost,
        status: subscription.status,
        lastUsage: subscription.lastUsage,
        warningLabel: subscription.warningLabel,
      },
    })
    if (error) return null
    const text = data?.recommendation
    return typeof text === 'string' && text.trim() ? text.trim() : null
  } catch {
    return null
  }
}
