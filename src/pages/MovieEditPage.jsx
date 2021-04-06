import { useMemo } from 'react';
import { Button } from '../components/Button';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '../components/Card';
import { Input, useInput } from '../components/Input';
import { Container } from '../components/Layout';
import { MoviePreview } from '../components/MoviePreview';

export const MovieEditPage = ({
  data,
}) => {
  const titleProps = useInput(data.title);
  const previewData = useMemo(
    () => ({
      ...data,
      title: titleProps.value,
    }),
    [data, titleProps],
  );
  return (
    <Container>
      <MoviePreview movie={previewData} full />
      <Card>
        <CardHeader title="Edit" />
        <CardContent>
          <Input {...titleProps} label="Title" />
          <Input />
          <Input />
          <Input />
          <Input />
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised">Save</Button>
          <Button color="secondary" variant="outlined">Clear</Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default MovieEditPage;
