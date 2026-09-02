'use client'

/**
 * Last-resort boundary for errors thrown in the root layout itself. It must
 * render its own <html>/<body>, so it deliberately avoids site chrome.
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#F5F5F7', color: '#1D1D1F', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <main id="main"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
            gap: '12px',
          }}
        >
          <h1 style={{ fontSize: '28px', fontWeight: 600, margin: 0 }}>Something went wrong</h1>
          <p style={{ color: '#6E6E73', maxWidth: '440px', lineHeight: 1.6, margin: 0 }}>
            ACE Electronics hit an unexpected problem. Please try again, or message us on WhatsApp and we&apos;ll help right away.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}>
            <button
              onClick={reset}
              style={{ background: '#0A84FF', color: '#fff', border: 0, borderRadius: '999px', padding: '14px 28px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}
            >
              Try again
            </button>
            <a
              href="https://wa.me/233547981348"
              target="_blank"
              rel="noopener noreferrer"
              style={{ border: '1px solid rgba(0,0,0,0.12)', borderRadius: '999px', padding: '14px 28px', fontSize: '16px', fontWeight: 500, color: '#1D1D1F', textDecoration: 'none' }}
            >
              Chat on WhatsApp
            </a>
          </div>
        </main>
      </body>
    </html>
  )
}
