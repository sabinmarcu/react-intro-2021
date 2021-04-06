import { useMemo } from 'react';
import RefreshIcon from 'mdi-react/RefreshIcon';
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

export default MoviePreview;
