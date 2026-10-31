import { ImageResponse } from 'next/og';
import { CALCULATORS, getCalculatorBySlug } from '@/lib/calculators';

export const dynamic     = 'force-static';
export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return CALCULATORS.map(c => ({ slug: c.slug }));
}

const CATEGORY_COLOR: Record<string, string> = {
  risk:     '#EF4444',
  profit:   '#22C55E',
  position: '#F59E0B',
  utility:  '#3B82F6',
  propfirm: '#8B5CF6',
  futures:  '#06B6D4',
};

const CATEGORY_LABEL: Record<string, string> = {
  risk:     'Risk Management',
  profit:   'Profit & P&L',
  position: 'Position Sizing',
  utility:  'Utility Tool',
  propfirm: 'Prop Firm Tools',
  futures:  'Futures Trading',
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);

  const accentColor   = calc ? CATEGORY_COLOR[calc.category] : '#F59E0B';
  const categoryLabel = calc ? CATEGORY_LABEL[calc.category] : 'Trading Tool';
  const assetsText    = calc?.assets.map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(' · ') ?? '';
  const descText      = (calc?.description ?? '').substring(0, 130) + ((calc?.description?.length ?? 0) > 130 ? '…' : '');

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
        {/* Accent side bar */}
        <div style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '6px', background: accentColor, display: 'flex' }} />

        {/* Category pill row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{
            background: `${accentColor}22`,
            border: `1px solid ${accentColor}66`,
            borderRadius: '6px',
            padding: '4px 14px',
            fontSize: '13px',
            fontWeight: '700',
            color: accentColor,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
            display: 'flex',
          }}>
            {categoryLabel}
          </div>
          <div style={{ fontSize: '13px', color: '#6B7280', fontFamily: 'sans-serif', display: 'flex' }}>
            Free · No Sign-up
          </div>
        </div>

        {/* Headline */}
        <div style={{ fontSize: '56px', fontWeight: '700', color: '#FFFFFF', lineHeight: '1.15', marginBottom: '20px', display: 'flex' }}>
          {(calc?.shortTitle ?? 'Trading') + ' Calculator'}
        </div>

        {/* Description */}
        <div style={{ fontSize: '20px', color: '#9CA3AF', maxWidth: '820px', lineHeight: '1.5', fontFamily: 'sans-serif', display: 'flex' }}>
          {descText}
        </div>

        {/* Footer row */}
        <div style={{ marginTop: '44px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '20px', color: '#F59E0B', fontWeight: '700', fontFamily: 'sans-serif', display: 'flex' }}>
            tradecalcapp.com
          </div>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#374151', display: 'flex' }} />
          <div style={{ fontSize: '14px', color: '#6B7280', fontFamily: 'sans-serif', display: 'flex' }}>
            {assetsText}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
