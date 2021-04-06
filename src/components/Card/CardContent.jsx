import styles from './CardContent.module.css';

export const CardContent = ({
  children,
  className,
  center,
  ...rest
}) => (
  <div
    {...rest}
    className={[
      className,
      styles.cardContent,
      center && styles.center,
    ].filter(Boolean).join(' ')}
  >
    {children}
  </div>
);

export default CardContent;
