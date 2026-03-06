import { ImageResponse } from 'next/og';
import { fetchData } from '@/lib/fetchData';

export const runtime = 'edge';

// Image metadata
export const alt = 'Dashboard Open Graph Image';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const data = await fetchData();
  const description = `${data.role}${data.team ? ` | ${data.team}` : ''}`;

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#09090b',
        color: '#ffffff',
        letterSpacing: '-.02em',
        fontWeight: 700,
      }}
    >
      <div style={{ display: 'flex', fontSize: 130, marginBottom: '20px' }}>
        {data.name}
      </div>
      <div style={{ display: 'flex', fontSize: 60, color: '#a1a1aa' }}>
        {description}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 40,
          marginTop: '40px',
          color: '#3b82f6',
        }}
      >
        Brag Dashboard
      </div>
    </div>,
    {
      ...size,
    },
  );
}
