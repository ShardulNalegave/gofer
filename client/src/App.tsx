import React from 'react';
import './App.css';
import { Button, MantineProvider, Text } from '@mantine/core';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Text>Welcome to Mantine!</Text>
      <Button>Click Me!</Button>
    </MantineProvider>
  );
}

export default App;
