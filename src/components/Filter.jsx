import { useEffect } from 'react';
import { useSearch } from '../hooks/useSearch';
import { Input, useInput } from './Input';

export const Filter = ({
  value,
  ...rest
}) => {
  const { params: search, update: updateSearch } = useSearch();
  useEffect(
    () => {
      const searchParam = search.q || '';
      if (searchParam !== value) {
        updateSearch('q', value);
      }
    },
    [value, updateSearch, search],
  );
  return (
    <Input
      {...rest}
      value={value}
    />
  );
};

export const useFilter = () => {
  const { params: search } = useSearch();
  const state = useInput(search.q);
  return state;
};
