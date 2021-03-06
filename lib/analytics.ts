import * as Fathom from 'fathom-client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function useAnalytics() {
  const router = useRouter();

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'production' &&
      process.env.NEXT_PUBLIC_FATHOM_SITE_ID
    ) {
      Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID, {
        url: 'https://firefly.maier.tech/script.js',
        includedDomains: ['maier.tech'],
      });
    }

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    // Record a pageview when route changes.
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener.
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
    // Intention: [] to signal that this hook should be executed only once.
    // This triggers ESLint rule react-hooks/exhaustive-deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
