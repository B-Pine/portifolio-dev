import { useEffect, useState } from 'react';

const CODE = import.meta.env.VITE_GOATCOUNTER_CODE;

export function useVisitorCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    if (!CODE) return;
    let cancelled = false;
    fetch(`https://${CODE}.goatcounter.com/counter/TOTAL.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.count_unique !== 'undefined') {
          const n = parseInt(String(data.count_unique).replace(/\D/g, ''), 10);
          if (!Number.isNaN(n)) setCount(n);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return count;
}

export const goatcounterEnabled = !!CODE;
export const goatcounterCode = CODE;
