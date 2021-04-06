import { MovieFetcher, MoviePreview } from '../MoviePreview';
import { Loading } from '../Loading';

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
      <div>
        <Loading style={{ width: 100, height: 100 }} />
      </div>
    );
  }

  if (error) {
    return (
      <h1>{error.message}</h1>
    );
  }

  if (isLoaded && (!movies || (Array.isArray(movies) && movies.length === 0))) {
    return (
      <h1>Something went wrong. Couldn&apos;t find any data.</h1>
    );
  }

  return (
    <>
      {list.map(
        ({ id, ...rest }) => (
          <MovieFetcher
            key={id}
            id={id}
          >
            {({ movie, update }) => (
              <MoviePreview
                {...rest}
                movie={movie}
                update={update}
                onClick={onItemClick(id)}
              />
            )}
          </MovieFetcher>
        ),
      )}
    </>
  );
};

export default MoviesList;
