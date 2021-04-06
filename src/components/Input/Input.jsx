import { useCallback, useMemo, useState } from 'react';

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

export const isRequired = (value) => (!value
  ? 'is required'
  : undefined);
export const isMoreThan = (min) => (value) => (value < min
  ? `should be more than ${min}`
  : undefined);
export const isLessThan = (max) => (value) => (value > max
  ? `should be less than ${max}`
  : undefined);
export const isHTTP = (value) => (!/^https?:\/\//.test(value)
  ? 'should be an http(s) link'
  : undefined);

export const useInput = (
  defaultValue = '',
  validators = [],
  {
    processor,
    ...props
  } = {},
) => {
  const [value, setValue] = useState(defaultValue);
  const [isDirty, setIsDirty] = useState(false);
  const onChange = useCallback(
    ({ target: { value: newValue } }) => {
      setValue(processor
        ? processor(newValue)
        : newValue);
      setIsDirty(true);
    },
    [setValue, setIsDirty],
  );
  const errors = useMemo(
    () => validators.map((validator) => validator(value)).filter(Boolean),
    [validators, value],
  );
  const isValid = useMemo(
    () => errors.length === 0,
    [errors],
  );
  const hasChanged = useMemo(
    () => value !== defaultValue,
    [value, defaultValue],
  );
  const reset = useCallback(
    () => {
      setValue(defaultValue);
      setIsDirty(false);
    },
    [setValue, setIsDirty],
  );
  return {
    value,
    isDirty,
    errors,
    onChange,
    isValid,
    hasChanged,
    reset,
    ...props,
  };
};
