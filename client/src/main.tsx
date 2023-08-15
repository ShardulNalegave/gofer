import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import './index.css';

import { router } from './router';
import { apolloClient } from './api/api';
import { AuthProvider } from './contexts/Auth';
import { AppTheme } from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={ AppTheme }>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </MantineProvider>
    </ApolloProvider>
  </React.StrictMode>
)
