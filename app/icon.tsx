import { ImageResponse } from 'next/og';
import { fetchData } from '@/lib/fetchData';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default async function Icon() {
  const data = await fetchData();

  // Get initials from name (e.g. John Doe -> JD)
  const initials = data.name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return new ImageResponse(
    <div
      style={{
        fontSize: 20,
        background: 'black',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        borderRadius: '50%',
        fontWeight: 'bold',
      }}
    >
      {initials}
    </div>,
    {
      ...size,
    },
  );
}
