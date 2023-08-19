
import { useNavigate } from 'react-router-dom';
import { createStyles, Text, Paper, Grid, Center, Loader } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useQuery } from '@apollo/client';

import { queries } from '../api/api';
import Page from '../components/Page';

const useStyles = createStyles({});

export default function Projects() {
  let {} = useStyles();
  let navigate = useNavigate();
  let { loading, error, data } = useQuery(queries.GET_PROJECTS, { pollInterval: 1000 });

  return (
    (!loading && !error) ?
      <Page padding={ 30 } scroll={true}>
        <Grid gutter={0}>
          {data.projects.map((project: any) => {
            return (
              <Grid.Col span='content' style={{ padding: '8px' }} key={project.id}>
                <Paper
                  shadow="sm"
                  radius="md"
                  withBorder
                  style={{ padding: '20px', width: '300px', height: '200px', cursor: 'pointer' }}
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <Text size={20} weight={500}>{project.title}</Text>
                  <Text size="sm" color="dimmed" truncate>
                    {project.description}
                  </Text>
                </Paper>
              </Grid.Col>
            );
          })}
          <Grid.Col span='content' style={{ padding: '8px' }}>
            <Paper shadow="sm" radius="md" withBorder style={{ padding: '20px', width: '300px', height: '200px', cursor: 'pointer' }}>
              <Center style={{ height: '100%', width: '100%' }}>
                <IconPlus />
              </Center>
            </Paper>
          </Grid.Col>
        </Grid>
      </Page>
      :
      <Page scroll={false} padding={0}>
        <Center style={{ height: '100vh' }}>
          <Loader />
        </Center>
      </Page>
  );
}
