// ACE Electronics — Supabase connectivity health check.
//
// GET /api/health/supabase
//
// Returns 200 when the app can reach Supabase and read all three expected
// tables under RLS, 503 otherwise. Useful for confirming a deployment's
// environment variables are actually present in the running environment,
// which is the most common cause of a "works locally, broken in prod" report.
//
// This is a DIAGNOSTIC endpoint. It exposes only table names and row counts —
// never credentials and never row contents.

import { NextResponse } from 'next/server'
import { checkSupabaseConnection } from '@/lib/supabase'

// Always execute at request time; a cached health check is worthless.
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const result = await checkSupabaseConnection()

  return NextResponse.json(result, {
    status: result.ok ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
