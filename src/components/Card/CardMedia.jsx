import styles from './CardMedia.module.css';

export const CardMedia = ({
  src,
  alt,
  className,
  children,
  ...rest
}) => (
  <div className={[
    className,
    styles.wrapper,
  ].filter(Boolean).join(' ')}
  >
    {children || (
      <img
        {...rest}
        className={styles.img}
        src={src}
        alt={alt}
      />
    )}
  </div>
);

export default CardMedia;
