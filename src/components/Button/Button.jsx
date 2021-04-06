import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Button.module.css';

const validColors = ['primary', 'secondary', 'default'];
const validVariants = ['raised', 'outlined', 'default'];

export const Button = ({
  children,
  className,
  color = 'default',
  variant = 'default',
  to,
  disabled,
  ...rest
}) => {
  const isIcon = useMemo(
    () => !Array.isArray(children) && children.type && children.type.type && children.type.type.name.endsWith('Icon'),
    [children],
  );
  const RenderComponent = useMemo(
    () => (to
      ? NavLink
      : 'button'),
    [to],
  );
  return (
    <RenderComponent
      {...rest}
      to={to}
      className={[
        className,
        styles.button,
        validVariants.includes(variant) && styles[variant],
        validColors.includes(color) && styles[color],
        isIcon && styles.icon,
      ].filter(Boolean).join(' ')}
      disabled={disabled}
    >
      {variant !== 'raised' && !disabled && <div className={styles.background} />}
      {variant === 'outlined' && <div className={styles.outline} />}
      {children}
      {variant === 'raised' && <div className={styles.overlay} />}
    </RenderComponent>
  );
};

export default Button;
