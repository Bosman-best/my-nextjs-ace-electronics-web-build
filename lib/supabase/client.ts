// ACE Electronics — Supabase client factories.
//
// Two entry points, both using ONLY the publishable (anon) key:
//
//   getSupabaseBrowserClient()  — for 'use client' components. Memoised, so a
//                                 single connection is shared across the app.
//   getSupabaseServerClient()   — for server components, route handlers and
//                                 build-time data fetching. Not memoised and
//                                 not session-persisting, so requests never
//                                 leak state between users.
//
// There is no service-role client here, by design. Every query is subject to
// the project's Row Level Security policies.

import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import {
  SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_URL,
  isSupabaseConfigured,
  looksLikeServiceRoleKey,
  supabaseConfigError,
} from './env'

/**
 * Throws if the environment is unusable. Called by both factories so a
 * misconfiguration fails loudly at the point of use rather than producing
 * confusing 401s deeper in the stack.
 */
function assertUsableConfig() {
  const err = supabaseConfigError()
  if (err) throw new Error(`[supabase] ${err}`)

  // Refuse to build a client around a service-role key. This would otherwise
  // ship RLS-bypassing database access to every visitor's browser.
  if (looksLikeServiceRoleKey()) {
    throw new Error(
      '[supabase] NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY appears to be a SERVICE-ROLE key. ' +
        'That key bypasses Row Level Security and must never be exposed to the browser. ' +
        'Use the project\'s publishable (anon) key instead.',
    )
  }
}

/** Options shared by both clients. */
const commonOptions = {
  db: { schema: 'public' as const },
  global: {
    headers: {
      // Helps identify this app's traffic in Supabase logs.
      'x-application-name': 'ace-electronics-web',
    },
  },
}

let browserClient: SupabaseClient | null = null

/**
 * Client for use in the browser ('use client' components).
 *
 * Memoised: repeated calls return the same instance, avoiding duplicate
 * realtime/auth connections.
 */
export function getSupabaseBrowserClient(): SupabaseClient {
  assertUsableConfig()
  if (browserClient) return browserClient

  browserClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    ...commonOptions,
    auth: {
      // No admin/auth UI yet. Once the admin panel lands, this is where session
      // persistence gets enabled.
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
  return browserClient
}

/**
 * Client for server components, route handlers, and build-time fetching.
 *
 * Deliberately NOT memoised and never persists a session: server module state
 * is shared across all requests, so caching a session-bearing client there
 * could leak one user's context into another user's request.
 */
export function getSupabaseServerClient(): SupabaseClient {
  assertUsableConfig()

  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    ...commonOptions,
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}

/**
 * Non-throwing variant for optional paths (e.g. the health check, or code that
 * should fall back to the seed catalog). Returns null when unconfigured.
 */
export function tryGetSupabaseServerClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null
  try {
    return getSupabaseServerClient()
  } catch {
    return null
  }
}
