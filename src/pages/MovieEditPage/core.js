import { useCallback, useMemo } from 'react';

export const useField = (data, fields = {}) => {
  const previewData = useMemo(
    () => Object.entries(fields).reduce(
      (prev, [key, field]) => ({
        ...prev,
        [key]: field.value,
      }),
      { ...data },
    ),
    [
      data,
      fields,
    ],
  );
  const isDirty = useMemo(
    () => Object.values(fields)
      .reduce((prev, field) => prev || field.isDirty, false),
    [fields],
  );
  const isValid = useMemo(
    () => Object.values(fields)
      .reduce((prev, field) => prev && field.isValid, true),
    [fields],
  );
  const hasChanged = useMemo(
    () => Object.values(fields)
      .reduce((prev, field) => prev || field.hasChanged, false),
    [fields],
  );
  const reset = useCallback(
    () => Object.values(fields)
      .forEach((field) => field.reset()),
    [fields],
  );
  return {
    previewData,
    isDirty,
    isValid,
    hasChanged,
    reset,
  };
};

export default useField;
