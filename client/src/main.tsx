import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import './index.css';

import { router } from './router';
import { apolloClient } from './api/api';
import { AppTheme } from './theme';
import { LoggerInUserDataProvider } from './contexts/loggedInUserData';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={ AppTheme }>
        <LoggerInUserDataProvider>
          <RouterProvider router={router} />
        </LoggerInUserDataProvider>
      </MantineProvider>
    </ApolloProvider>
  </React.StrictMode>
)
