import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useHistory } from 'react-router';
import { Button } from '../components/Button';
import { Container } from '../components/Layout';
import { Movie } from '../components/MoviePreview';
import { useFetch } from '../hooks/useFetch';
// import LoadingIcon from 'mdi-react/LoadingIcon';

const DeleteButton = ({ id }) => {
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
      method: 'DELETE',
    },
  );

  const [errorMessage, setErrorMessage] = useState(undefined);
  useEffect(
    () => {
      if (isLoaded && error) {
        setErrorMessage(`Error: ${error.message}, please retry`);
      }
    },
    [isLoaded, error, setErrorMessage],
  );

  const deleteHandler = useCallback(
    async () => {
      if (!isLoading && confirm('Are you sure you want to delete this?')) { // eslint-disable-line
        setErrorMessage(undefined);
        await update();
        history.push('/');
      }
    },
    [update, isLoading, history, setErrorMessage],
  );

  return (
    <Button
      variant="outlined"
      color="secondary"
      loading={isLoading}
      onClick={deleteHandler}
    >
      {errorMessage || 'Delete'}
    </Button>
  );
};

export const MoviePage = ({
  match: {
    params: {
      id,
    },
  },
}) => (
  <Container>
    <Movie id={id} full>
      <DeleteButton id={id} />
    </Movie>
  </Container>
);
export default MoviePage;
