import React, { ReactNode } from 'react';
import { createStyles, ScrollArea } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  mainContainer: {
    width: '100%',
    height: '100vh',
  },
}));

interface PageProps {
  children?: ReactNode,
};

export default function Page({ children }: PageProps) {
  const { classes } = useStyles();

  return (
    <ScrollArea className={classes.mainContainer}>
      {children}
    </ScrollArea>
  );
}
