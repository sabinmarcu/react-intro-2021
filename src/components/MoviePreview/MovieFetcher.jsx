import { Redirect } from 'react-router';
import { createContext, useContext, useMemo } from 'react';
import RefreshIcon from 'mdi-react/RefreshIcon';
import { ResponseError, useFetch } from '../../hooks/useFetch';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
} from '../Card';
import { Skeleton } from '../Skeleton';

const ErrorCard = ({ update, message }) => (
  <Card onClick={update}>
    <CardHeader title="Error" subtitle="Please click here to retry" />
    <CardContent center>
      <RefreshIcon style={{ width: 50, height: 50 }} />
    </CardContent>
    <CardContent>
      <p>{message}</p>
    </CardContent>
  </Card>
);

export const MovieFetcherContext = createContext();
export const useMovieFetcher = () => useContext(MovieFetcherContext);

export const MovieFetcher = ({
  id,
  children,
  autoload = true,
  redirect = true,
}) => {
  const url = useMemo(
    () => `http://localhost:4000/movies/${id}`,
    [id],
  );
  const {
    data: movie,
    error,
    isLoading,
    isLoaded,
    update,
  } = useFetch(url, { autoload });
  if (isLoading || !(isLoading || isLoaded || error || movie)) {
    return (
      <Card>
        <CardHeader title={<Skeleton />} subtitle={<Skeleton />} />
        <CardMedia />
        <CardContent>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </CardContent>
      </Card>
    );
  }
  if (error) {
    if (redirect
        && error instanceof ResponseError
        && error.code === 404
    ) {
      return (
        <Redirect to="/" />
      );
    }
    return (<ErrorCard update={update} message={error.message} />);
  }
  if (isLoaded && !movie) {
    return (<ErrorCard update={update} message="No Data" />);
  }
  return (
    <MovieFetcherContext.Provider value={{
      movie,
      update,
      isLoaded,
      isLoading,
      error,
    }}
    >
      {
        children({
          movie,
          update,
          isLoaded,
          isLoading,
          error,
        })
    }
    </MovieFetcherContext.Provider>
  );
};

export default MovieFetcher;
