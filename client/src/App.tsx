
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Grid, Center, Loader } from '@mantine/core';

import { validateToken } from './authUtils';
import { routesCompleteUI } from './router';
import Sidebar from './components/Sidebar';
import Page from './components/Page';

export default function App() {
  let loc = useLocation();
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    validateToken()
      .then(_ => setLoading(false))
      .catch(_ => setLoading(false));
  }, []);

  return (
    loading ?
      <Page scroll={false} padding={0}>
        <Center style={{ height: '100vh' }}>
          <Loader />
        </Center>
      </Page>
      : 
      <Grid gutter={0}>
        {
          routesCompleteUI.includes(loc.pathname) ?
            <Grid.Col span="content">
              <Sidebar />
            </Grid.Col>
            : <></>
        }
        <Grid.Col span="auto">
          <Outlet />
        </Grid.Col>
      </Grid>
  );
}