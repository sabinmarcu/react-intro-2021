import styles from './Skeleton.module.css';

export const Skeleton = ({
  className,
  ...rest
}) => (
  <div
    {...rest}
    className={[
      className,
      styles.skeleton,
    ].filter(Boolean).join(' ')}
  >
    Skeleton
  </div>
);

export default Skeleton;
