import { useCallback, useDebugValue, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router';

export const useSearch = () => {
  const location = useLocation();
  const history = useHistory();
  const params = useMemo(
    () => location.search
      .substr(1)
      .split('&')
      .map((it) => it.split('='))
      .reduce(
        (prev, [key, value]) => ({ ...prev, [key]: value }),
        {},
      ),
    [location],
  );
  const update = useCallback(
    (key, value) => {
      const newParams = {
        ...params,
        [key]: value,
      };
      history.push({
        pathname: location.pathname,
        search: Object.entries(newParams)
          .map((set) => set.join('='))
          .join('&'),
      });
    },
    [history, location],
  );
  useDebugValue(Object.keys(params));
  return { params, update };
};

export default useSearch;
