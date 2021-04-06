/* eslint-disable */
import { useCallback, useState } from 'react';

import styles from './Input.module.css';

export const Input = ({
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

export const useInput = (defaultValue = '') => {
  const [value, setValue] = useState(defaultValue);
  const onChange = useCallback(
    ({ target: { value: newValue } }) => {
      setValue(newValue);
    },
    [setValue],
  );
  return { value, onChange };
};
