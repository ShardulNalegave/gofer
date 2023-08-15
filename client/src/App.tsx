
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Grid } from '@mantine/core';

import { authProtectedRoutes, authUnprotectedRoute, routesCompleteUI } from './router';
import { useAuth } from './contexts/Auth';
import Sidebar from './components/Sidebar';

export default function App() {
  let loc = useLocation();
  let navigate = useNavigate();
  let authData = useAuth();

  useEffect(() => {
    if (authProtectedRoutes.includes(loc.pathname) && !authData.isAuth) {
      navigate('/login');
    } else if (authUnprotectedRoute.includes(loc.pathname) && authData.isAuth) {
      navigate('/dashboard');
    }
  }, []);

  return (
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