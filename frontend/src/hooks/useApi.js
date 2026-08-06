import { useState, useEffect, useCallback } from 'react';

/**
 * Generic reusable API data-fetching hook.
 *
 * @param {Function} fetchFn   - An async function that returns { data, error }
 *                               (matches the shape returned by profileService functions)
 * @param {*}        fallback  - Static fallback data to use when the API is unavailable.
 *                               The component renders identically whether data comes
 *                               from the API or from the fallback.
 * @param {Array}    deps      - Optional dependency array (like useEffect deps)
 *
 * @returns {{ data: *, loading: boolean, error: string|null, refetch: Function }}
 *
 * Usage example:
 *   import { getSkills } from '../services/api';
 *   import { skillsData } from './staticData'; // your existing static array
 *
 *   const { data: skills, loading } = useApi(getSkills, skillsData);
 */
const useApi = (fetchFn, fallback = null, deps = []) => {
  const [data, setData]       = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await fetchFn();

    if (result.data !== null && result.data !== undefined) {
      setData(result.data);
      setError(null);
    } else {
      // API failed — keep the fallback data, store the error silently
      setError(result.error);
      // data remains as the fallback set in useState(fallback)
    }

    setLoading(false);
  }, [fetchFn]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    execute();
  }, [execute, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, refetch: execute };
};

export default useApi;
