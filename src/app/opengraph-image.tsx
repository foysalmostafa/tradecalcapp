import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/seo';

export const dynamic     = 'force-static';
export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #0F1629 0%, #1a2540 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Amber accent bar */}
        <div style={{ width: '56px', height: '4px', background: '#F59E0B', borderRadius: '2px', marginBottom: '28px', display: 'flex' }} />

        {/* Eyebrow */}
        <div style={{ fontSize: '15px', color: '#9CA3AF', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '18px', fontFamily: 'sans-serif', display: 'flex' }}>
          Free Trading Calculators
        </div>

        {/* Headline */}
        <div style={{ fontSize: '56px', fontWeight: '700', color: '#FFFFFF', lineHeight: '1.15', marginBottom: '22px', display: 'flex' }}>
          {SITE.tagline}
        </div>

        {/* Subtext */}
        <div style={{ fontSize: '21px', color: '#9CA3AF', maxWidth: '780px', lineHeight: '1.5', fontFamily: 'sans-serif', display: 'flex' }}>
          37 professional calculators for forex, stocks, crypto & futures. Position size, pip value, P&L, margin, risk/reward and more.
        </div>

        {/* Footer */}
        <div style={{ marginTop: '44px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '20px', color: '#F59E0B', fontWeight: '700', fontFamily: 'sans-serif', display: 'flex' }}>
            tradecalcapp.com
          </div>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#374151', display: 'flex' }} />
          <div style={{ fontSize: '16px', color: '#6B7280', fontFamily: 'sans-serif', display: 'flex' }}>
            100% Free · No Sign-up Required
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
