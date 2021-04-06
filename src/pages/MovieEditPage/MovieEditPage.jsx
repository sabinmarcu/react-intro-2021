import { useMemo } from 'react';
import { Button } from '../../components/Button';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '../../components/Card';
import {
  Input,
  isLessThan,
  isMoreThan,
  isRequired,
  useInput,
} from '../../components/Input';
import { Container } from '../../components/Layout';
import { MoviePreview } from '../../components/MoviePreview';
import { useField } from './core';

export const MovieEditPage = ({
  data,
}) => {
  const titleProps = useInput(
    data.title,
    [isRequired],
    {
      label: 'Title',
    },
  );
  const genreProps = useInput(
    data.genre,
    [isRequired],
    {
      label: 'Genre',
    },
  );
  const yearProps = useInput(
    data.year,
    [
      isRequired,
      isMoreThan(1900),
      isLessThan(new Date(Date.now()).getFullYear()),
    ],
    {
      label: 'Year',
      type: 'number',
      processor: (value) => parseInt(value, 10),
    },
  );
  const plotProps = useInput(
    data.plot,
    [isRequired],
    {
      label: 'Plot',
    },
  );
  const posterProps = useInput(
    data.poster,
    [isRequired],
    {
      label: 'Poster',
    },
  );
  const fieldSet = useMemo(
    () => (
      {
        title: titleProps,
        genre: genreProps,
        year: yearProps,
        plot: plotProps,
        poster: posterProps,
      }
    ),
    [
      titleProps.value,
      genreProps.value,
      yearProps.value,
      plotProps.value,
      posterProps.value,
    ],
  );
  const {
    previewData,
    isDirty,
    isValid,
    hasChanged,
  } = useField(
    data,
    fieldSet,
  );
  return (
    <Container>
      <MoviePreview movie={previewData} full />
      <Card>
        <CardHeader title="Edit" />
        <CardContent>
          <Input {...titleProps} />
          <Input {...genreProps} />
          <Input {...yearProps} />
          <Input {...plotProps} />
          <Input {...posterProps} />
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="raised"
            disabled={!isValid || !hasChanged}
          >
            Save
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            disabled={!isDirty}
          >
            Clear
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default MovieEditPage;
