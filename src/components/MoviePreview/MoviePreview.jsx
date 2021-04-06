import { useMemo } from 'react';
import RefreshIcon from 'mdi-react/RefreshIcon';
import { Redirect } from 'react-router';
import { ResponseError, useFetch } from '../../hooks/useFetch';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
} from '../Card';
import { Button } from '../Button';

export const MoviePreview = ({
  movie: {
    title,
    year,
    genre,
    plot,
    poster,
  } = {},
  update,
  onClick,
  full,
  actions,
}) => {
  const onUpdate = useMemo(
    () => (update
      ? (event) => {
        event.preventDefault();
        update();
      }
      : undefined),
    [update],
  );
  return (
    <Card onClick={onClick}>
      <CardHeader
        title={title}
        subtitle={`${year} (${genre})`}
      />
      <CardMedia src={poster} alt={title} />
      {full && <CardContent>{plot}</CardContent>}
      {(actions || update) && (
        <CardActions>
          {actions || <span />}
          {update && (
            <Button onClick={onUpdate}>
              <RefreshIcon />
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export const Movie = ({
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
        <CardHeader title="Loading..." />
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
  return children(movie, update);
};

export default MoviePreview;
