import { Card, CardHeader } from '../Card';
import { Container } from '../Layout';
import { Movie, MoviePreview } from '../MoviePreview';

export const MoviesList = ({
  list,
  isLoading,
  error,
  movies,
  isLoaded,
  onItemClick,
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader title="Loading..." />
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader title="Error" subtitle={error.message} />
      </Card>
    );
  }

  if (isLoaded && (!movies || (Array.isArray(movies) && movies.length === 0))) {
    return (
      <Card>
        <CardHeader title="Error" subtitle="No data" />
      </Card>
    );
  }

  return (
    <Container direction="horizontal" wrap>
      {list.map(
        ({ id, ...rest }) => (
          <Movie
            key={id}
            id={id}
          >
            {(movie, update) => (
              <MoviePreview
                {...rest}
                movie={movie}
                update={update}
                onClick={onItemClick(id)}
              />
            )}
          </Movie>
        ),
      )}
    </Container>
  );
};

export default MoviesList;
