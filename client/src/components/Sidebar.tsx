import React from 'react';
import { createStyles, Text, ScrollArea } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  mainContainer: {
    width: '100%',
    height: '100vh',
    backgroundColor: "#141517",
  }
}));

export default function Sidebar() {
  const { classes } = useStyles();

  return (
    <ScrollArea className={classes.mainContainer}>
      <Text>Sidebar</Text>
    </ScrollArea>
  );
}
