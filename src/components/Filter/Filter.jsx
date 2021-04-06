import { useCallback, useState } from 'react';

import styles from './Filter.module.css';

export const Filter = ({
  id,
  label,
  className,
  value,
  ...rest
}) => (
  <label
    htmlFor={id}
    className={[
      className,
      styles.wrapper,
      value && styles.active,
    ].filter(Boolean).join(' ')}
  >
    <input
      value={value}
      className={styles.input}
      {...rest}
      id={id}
    />
    <span className={styles.label}>{label}</span>
  </label>
);

export const useFilter = (defaultValue = '') => {
  const [filter, setFilter] = useState(defaultValue);
  const onChange = useCallback(
    ({ target: { value } }) => {
      setFilter(value);
    },
    [setFilter],
  );
  return { value: filter, onChange };
};
