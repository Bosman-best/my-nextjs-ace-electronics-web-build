// ACE Electronics — single source of truth for the canonical site URL.
//
// Priority:
//  1. NEXT_PUBLIC_SITE_URL          — explicit override (e.g. a future custom domain)
//  2. VERCEL_PROJECT_PRODUCTION_URL — automatically provided by Vercel on builds;
//                                     resolves to the project's real production domain
//  3. Verified production alias     — the stable Vercel production alias for this
//                                     project, confirmed via the repository's GitHub
//                                     deployment records (vercel[bot], Vercel project
//                                     "my-nextjs-ace-electronics-web-build-dlsn",
//                                     team "sir-bosman"). Replace via env var when a
//                                     custom domain is attached.
const VERIFIED_PRODUCTION_ALIAS = 'https://my-nextjs-ace-electronics-web-build-dlsn.vercel.app'

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/+$/, '')
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (vercelProduction) return `https://${vercelProduction}`.replace(/\/+$/, '')
  return VERIFIED_PRODUCTION_ALIAS
}

export const SITE_URL = resolveSiteUrl()
export const SITE_NAME = 'ACE Electronics'
export const SITE_TAGLINE = 'Your Trusted Tech Plug'
