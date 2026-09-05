// ACE Electronics — Supabase environment configuration.
//
// Credentials are read from the environment ONLY. Nothing in this repository
// hardcodes a Supabase URL or key into application source.
//
// Next.js inlines `process.env.NEXT_PUBLIC_*` at build time by statically
// replacing the literal expression, so these must be written out in full —
// `process.env[someVariable]` would silently resolve to undefined in the
// browser bundle.

/** Public project URL, e.g. https://<ref>.supabase.co */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''

/**
 * Publishable (anon) key.
 *
 * Safe to ship to the browser: it identifies the project but grants no access
 * on its own. Every request made with it is still evaluated against the
 * project's Row Level Security policies.
 *
 * The service-role key bypasses RLS and is deliberately NOT used anywhere in
 * this codebase.
 */
export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? ''

/**
 * True when both values are present.
 *
 * Callers use this to degrade gracefully rather than throw. The storefront must
 * keep rendering (from the seed catalog) even if Supabase is unconfigured, so a
 * missing key can never take the site down.
 */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY)

/** Human-readable reason why config is incomplete, or null when it's fine. */
export function supabaseConfigError(): string | null {
  const missing: string[] = []
  if (!SUPABASE_URL) missing.push('NEXT_PUBLIC_SUPABASE_URL')
  if (!SUPABASE_PUBLISHABLE_KEY) missing.push('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY')
  if (missing.length === 0) return null
  return `Missing environment variable(s): ${missing.join(', ')}. Copy .env.example to .env.local and fill them in.`
}

/**
 * Guard against a service-role key being pasted into the publishable slot.
 *
 * Supabase JWTs carry a `role` claim; a service-role key decodes to
 * `"role":"service_role"`. Shipping one in a NEXT_PUBLIC_* variable would
 * expose full RLS-bypassing database access to every visitor, so we detect it
 * and refuse rather than let it reach a browser bundle.
 *
 * Newer publishable keys (`sb_publishable_…`) are not JWTs and simply pass.
 */
export function looksLikeServiceRoleKey(key: string = SUPABASE_PUBLISHABLE_KEY): boolean {
  const parts = key.split('.')
  if (parts.length !== 3) return false
  try {
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const json = JSON.parse(
      typeof atob === 'function'
        ? atob(payload)
        : Buffer.from(payload, 'base64').toString('utf8'),
    )
    return json?.role === 'service_role'
  } catch {
    return false
  }
}
