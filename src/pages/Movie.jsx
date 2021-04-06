import { Route, Switch } from 'react-router';
import { Movie } from '../components/MoviePreview';
import { MoviePreviewPage } from './MoviePreview';

export const MoviePage = ({
  match: {
    params: {
      id,
    },
  },
}) => (
  <Movie id={id}>
    {(movieData) => (
      <Switch>
        <Route exact path="/movie/:id">
          <MoviePreviewPage data={movieData} />
        </Route>
      </Switch>
    )}
  </Movie>
);
export default MoviePage;
