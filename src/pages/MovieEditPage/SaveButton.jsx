import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useHistory } from 'react-router';
import { Button } from '../../components/Button';
import { useMovieFetcher } from '../../components/MoviePreview';
import { useFetch } from '../../hooks/useFetch';

export const SaveButton = ({
  id,
  data,
  isValid,
  hasChanged,
}) => {
  const history = useHistory();

  const url = useMemo(
    () => `http://localhost:4000/movies/${id}`,
    [id],
  );

  const {
    update,
    isLoading,
    isLoaded,
    error,
  } = useFetch(
    url,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );
  const { update: movieFetcherUpdate } = useMovieFetcher();

  const [errorMessage, setErrorMessage] = useState(undefined);
  useEffect(
    () => {
      if (isLoaded && error) {
        setErrorMessage(`Error: ${error.message}, please retry`);
      }
    },
    [isLoaded, error, setErrorMessage],
  );

  const saveHandler = useCallback(
    async () => {
      if (!isLoading
        && isValid
        && hasChanged
        && confirm('Are you sure you want to save this?') // eslint-disable-line
      ) {
        setErrorMessage(undefined);
        await update();
        await movieFetcherUpdate();
        history.push(`/movie/${id}`);
      }
    },
    [update, isLoading, history, setErrorMessage, isValid, hasChanged, movieFetcherUpdate],
  );

  return (
    <Button
      color="primary"
      variant="raised"
      disabled={!isValid || !hasChanged}
      loading={isLoading}
      onClick={saveHandler}
    >
      {errorMessage || 'Save'}
    </Button>
  );
};

export default SaveButton;
