import { ImageResponse } from 'next/og';
import { PUBLISHED_POSTS, getBlogPost } from '@/lib/blog';

export const dynamic     = 'force-static';
export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return PUBLISHED_POSTS.map(p => ({ slug: p.slug }));
}

const CATEGORY_COLOR: Record<string, string> = {
  guide:      '#F59E0B',
  comparison: '#3B82F6',
  pillar:     '#10B981',
};

const CATEGORY_LABEL: Record<string, string> = {
  guide:      'How-To Guide',
  comparison: 'Comparison',
  pillar:     'Complete Guide',
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  const accentColor    = post ? CATEGORY_COLOR[post.category] : '#F59E0B';
  const categoryLabel  = post ? CATEGORY_LABEL[post.category] : 'Trading Guide';
  const title          = post?.title ?? 'Trading Guide';
  const description    = (post?.description ?? '').substring(0, 120) + ((post?.description?.length ?? 0) > 120 ? '…' : '');
  const readTime       = post?.readingTimeMin ?? 5;
  const tagText        = post?.tags.slice(0, 2).join(' · ') ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #0A0F1E 0%, #1a2540 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Left accent bar */}
        <div style={{
          position: 'absolute',
          left: '0',
          top: '0',
          bottom: '0',
          width: '6px',
          background: accentColor,
          display: 'flex',
        }} />

        {/* Top row: category pill + reading time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
          <div style={{
            background: `${accentColor}22`,
            border: `1px solid ${accentColor}66`,
            borderRadius: '6px',
            padding: '4px 16px',
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
          {tagText && (
            <div style={{
              fontSize: '13px',
              color: '#6B7280',
              fontFamily: 'sans-serif',
              display: 'flex',
            }}>
              {tagText}
            </div>
          )}
          <div style={{
            marginLeft: 'auto',
            fontSize: '13px',
            color: '#6B7280',
            fontFamily: 'sans-serif',
            display: 'flex',
          }}>
            {readTime} min read
          </div>
        </div>

        {/* Title */}
        <div style={{
          fontSize: '52px',
          fontWeight: '700',
          color: '#FFFFFF',
          lineHeight: '1.15',
          marginBottom: '22px',
          display: 'flex',
          maxWidth: '1000px',
        }}>
          {title.length > 60 ? title.substring(0, 57) + '…' : title}
        </div>

        {/* Description */}
        <div style={{
          fontSize: '19px',
          color: '#9CA3AF',
          maxWidth: '820px',
          lineHeight: '1.5',
          fontFamily: 'sans-serif',
          display: 'flex',
          marginBottom: '36px',
        }}>
          {description}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            fontSize: '20px',
            color: accentColor,
            fontWeight: '700',
            fontFamily: 'sans-serif',
            display: 'flex',
          }}>
            tradecalcapp.com
          </div>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#374151', display: 'flex' }} />
          <div style={{
            fontSize: '15px',
            color: '#6B7280',
            fontFamily: 'sans-serif',
            display: 'flex',
          }}>
            Free Trading Education
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
