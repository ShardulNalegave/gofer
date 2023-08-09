
import { Outlet, useLocation } from 'react-router-dom';
import { MantineProvider, Grid } from '@mantine/core';

import { routesCompleteUI } from './router';
import { AppTheme } from './theme';
import Sidebar from './components/Sidebar';

export default function App() {
  let loc = useLocation();

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={ AppTheme }>
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
    </MantineProvider>
  );
}