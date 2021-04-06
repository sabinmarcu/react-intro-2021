import { useCallback, useEffect, useState } from 'react';
import Measure from 'react-measure';
import styles from './NavBar.module.css';

export const NavBar = ({
  className,
  children,
  ...rest
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navHeight, setNavHeight] = useState(0);
  useEffect(
    () => {
      const handler = () => {
        setScrollPosition(window.scrollY);
      };
      window.addEventListener('scroll', handler);
      return () => window.removeEventListener('scroll', handler);
    },
    [setScrollPosition],
  );
  const onResize = useCallback(
    ({
      bounds: { height } = {},
    } = {}) => setNavHeight(height),
    [setNavHeight],
  );

  return (
    <Measure
      bounds
      onResize={onResize}
    >
      {({ measureRef }) => (

        <div
          {...rest}
          ref={measureRef}
          className={[
            className,
            styles.navbar,
            scrollPosition > (navHeight * 0.7) && styles.scrolled,
          ].filter(Boolean).join(' ')}
        >
          {children}
        </div>
      )}
    </Measure>
  );
};

export default NavBar;
