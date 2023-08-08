
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { MantineProvider, Grid } from '@mantine/core';

import { router } from './router';
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
      <Grid gutter={0} grow>
        <Grid.Col span={2}>
          <Sidebar />
        </Grid.Col>
        <Grid.Col span={10}>
          <RouterProvider router={router} />
        </Grid.Col>
      </Grid>
    </MantineProvider>
  );
}