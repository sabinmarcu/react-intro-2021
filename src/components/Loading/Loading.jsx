import LoadingIcon from 'mdi-react/LoadingIcon';
import styles from './Loading.module.css';

export const Loading = ({
  className,
  ...rest
}) => (
  <LoadingIcon
    {...rest}
    className={[className, styles.loading].filter(Boolean).join(' ')}
  />
);

export default Loading;
