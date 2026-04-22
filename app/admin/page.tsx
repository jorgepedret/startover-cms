'use client';

import dynamic from 'next/dynamic';

const TinaAdmin = dynamic(() => import('tinacms/dist/admin'), {
  ssr: false,
  loading: () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <p>Loading TinaCMS...</p>
    </div>
  ),
});

export default function AdminPage() {
  return <TinaAdmin />;
}
