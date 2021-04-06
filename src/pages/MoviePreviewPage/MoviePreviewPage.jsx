import { Button } from '../../components/Button';
import { MoviePreview } from '../../components/MoviePreview';
import { DeleteButton } from './DeleteButton';

export const MoviePreviewPage = ({
  data,
}) => (
  <MoviePreview
    movie={data}
    full
    actions={(
      <>
        <Button
          variant="raised"
          color="primary"
          to={`/movie/${data && data.id}/edit`}
        >
          Edit
        </Button>
        <DeleteButton id={data && data.id} />
      </>
      )}
  />
);
export default MoviePreviewPage;
