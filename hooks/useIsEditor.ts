import { useEffect, useState } from 'react';

export function useIsEditor(): boolean {
  const [isEditor, setIsEditor] = useState(false);

  useEffect(() => {
    // Local dev: TinaCMS is always accessible
    if (process.env.NEXT_PUBLIC_TINA_IS_LOCAL === 'true') {
      setIsEditor(true);
      return;
    }

    // Production: Tina Cloud stores a JWT in localStorage after login
    try {
      const hasSession = Object.keys(localStorage).some((key) => {
        const val = localStorage.getItem(key);
        return (
          key.toLowerCase().includes('tina') &&
          typeof val === 'string' &&
          val.startsWith('ey')
        );
      });
      setIsEditor(hasSession);
    } catch {
      setIsEditor(false);
    }
  }, []);

  return isEditor;
}
