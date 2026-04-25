'use client';

import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    window.location.href = '/admin/index.html';
  }, []);

  return (
    <div className="flex items-center justify-center h-screen text-white bg-slate-900">
      Loading TinaCMS editor...
    </div>
  );
}
