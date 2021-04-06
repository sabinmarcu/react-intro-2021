import styles from './Container.module.css';

const validDirections = ['vertical', 'horizontal'];

export const Container = ({
  children,
  className,
  direction = 'horizontal',
  wrap = false,
  split = false,
  center = false,
  ...rest
}) => (
  <div
    {...rest}
    className={[
      className,
      styles.container,
      validDirections.includes(direction) && styles[direction],
      center && styles.center,
      wrap && styles.wrap,
      split && styles.split,
    ].filter(Boolean).join(' ')}
  >
    {children}
  </div>
);

export default Container;
