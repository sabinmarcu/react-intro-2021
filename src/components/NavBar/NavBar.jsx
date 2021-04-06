import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import Measure from 'react-measure';
import styles from './NavBar.module.css';

export const NavBar = ({
  className,
  children,
  ...rest
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navHeight, setNavHeight] = useState(0);
  const [blendThreshold, setBlendThreshold] = useState(0);

  useEffect(
    () => {
      const handler = () => {
        setBlendThreshold(Math.min(500, window.outerHeight - window.innerHeight));
      };
      handler();
      window.addEventListener('resize', handler);
      return () => window.removeEventListener('resize', handler);
    },
    [setBlendThreshold],
  );

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

  const blendPercent = useMemo(
    () => Math.max(
      0,
      Math.min(
        1,
        scrollPosition / blendThreshold,
      ),
    ),
    [scrollPosition, blendThreshold],
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
          <div
            style={{
              opacity: blendPercent,
            }}
            className={styles.background}
          />
          {children}
        </div>
      )}
    </Measure>
  );
};

export default NavBar;
