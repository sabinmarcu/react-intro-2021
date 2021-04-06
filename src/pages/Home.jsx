import RefreshIcon from 'mdi-react/RefreshIcon';
import { useCallback, useMemo } from 'react';
import { Button } from '../components/Button';
import { Filter, useFilter } from '../components/Filter';
import { Container } from '../components/Layout';
import { MoviesList } from '../components/MoviesList';
import { useFetch } from '../hooks/useFetch';
import { useSearch } from '../hooks/useSearch';

import styles from './Home.module.css';

const moviesUrl = 'http://localhost:4000/movies';
export const HomePage = ({
  history: {
    push,
  },
}) => {
  const filterProps = useFilter();
  const { params: search } = useSearch();

  const url = useMemo(
    () => (search.q
      ? `${moviesUrl}?q=${search.q}`
      : moviesUrl),
    [search],
  );

  const {
    data: movies,
    error,
    isLoading,
    isLoaded,
    update,
  } = useFetch(url, { autoload: true, debounce: 500 });

  const moviesIds = useMemo(
    () => (isLoaded && movies
      ? movies.map(({ id }) => ({ id }))
      : []
    ),
    [movies, isLoaded, movies],
  );
  const onClick = useCallback(
    (id) => () => push(`/movie/${id}`),
    [push],
  );
  return (
    <>
      <Container
        direction="horizontal"
        split
        center
      >
        <Filter
          id="movies-filter"
          label="Filter Movies"
          className={styles.filter}
          {...filterProps}
        />
        <Button onClick={update}>
          <RefreshIcon />
        </Button>
      </Container>
      <Container
        direction="horizontal"
        wrap
        center={isLoading}
      >
        <MoviesList {...{
          isLoading,
          error,
          movies,
          isLoaded,
          list: moviesIds,
          onItemClick: onClick,
        }}
        />
      </Container>
    </>
  );
};

export default HomePage;
