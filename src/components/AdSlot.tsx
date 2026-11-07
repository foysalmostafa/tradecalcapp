'use client';

// AdSlot: replace the inner div with your real AdSense code after approval.
// Before enabling ads, configure the account-provided verification and ad code,
// required privacy disclosures, and a Google-certified CMP where required.
// An ordinary custom cookie banner is not a certified advertising CMP.
// Keep the outer wrapper for layout stability (prevents CLS).

interface Props {
  slot?: string;
  format?: 'horizontal' | 'rectangle' | 'responsive';
  className?: string;
}

export default function AdSlot({ className = '' }: Props) {
  return (
    <div
      className={`ad-slot min-h-[90px] ${className}`}
    >
      {/* Replace with AdSense <ins> tag after approval */}
    </div>
  );
}
