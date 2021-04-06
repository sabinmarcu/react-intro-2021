import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Button } from './Button';

export const BackButton = (props) => {
  const history = useHistory();
  const location = useLocation();
  const back = useCallback(
    () => history.push(
      location.pathname.split('/')
        .filter((_, index, arr) => index < arr.length - 1)
        .join('/'),
    ),
    [history],
  );

  if (location.pathname === '/') {
    return null;
  }

  return (
    <Button
      {...props}
      onClick={back}
    />
  );
};

export default BackButton;
