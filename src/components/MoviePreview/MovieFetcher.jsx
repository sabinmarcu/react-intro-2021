import { Redirect } from 'react-router';
import { useMemo } from 'react';
import { ResponseError, useFetch } from '../../hooks/useFetch';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
} from '../Card';
import { Skeleton } from '../Skeleton';

export const MovieFetcher = ({
  id,
  children,
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
  } = useFetch(url, { autoload: true });
  if (isLoading) {
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
    if (error instanceof ResponseError && error.code === 404) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <Card>
        <CardHeader title="Error" subtitle={error.message} />
      </Card>
    );
  }
  if (isLoaded && !movie) {
    return (
      <Card>
        <CardHeader title="Error" subtitle="No data" />
      </Card>
    );
  }
  return children({
    movie,
    update,
    isLoaded,
    isLoading,
    error,
  });
};

export default MovieFetcher;
