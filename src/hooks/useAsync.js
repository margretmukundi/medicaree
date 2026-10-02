import { useEffect, useState } from 'react';

// Runs an async loader on mount / when deps change. Returns { data, loading, error }.
export function useAsync(loader, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    let live = true;
    setState(s => ({ ...s, loading: true, error: null }));
    loader().then(
      data => live && setState({ data, loading: false, error: null }),
      error => live && setState({ data: null, loading: false, error }),
    );
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}
