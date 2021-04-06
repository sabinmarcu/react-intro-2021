import { Route, Switch } from 'react-router';
import { MovieFetcher } from '../components/MoviePreview';
import { MoviePreviewPage } from './MoviePreviewPage';
import { MovieEditPage } from './MovieEditPage';
import { Container } from '../components/Layout';

export const MoviePage = ({
  match: {
    params: {
      id,
    },
  },
}) => (
  <Container center>
    <MovieFetcher id={id}>
      {({ movie }) => (
        <Switch>
          <Route exact path="/movie/:id">
            <MoviePreviewPage data={movie} />
          </Route>
          <Route exact path="/movie/:id/edit">
            <MovieEditPage data={movie} />
          </Route>
        </Switch>

      )}
    </MovieFetcher>
  </Container>
);
export default MoviePage;
