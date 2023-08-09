import React, { ReactNode } from 'react';
import { createStyles, ScrollArea } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  mainContainer: {
    width: '100%',
    height: '100vh',
    backgroundColor: "#141517",
  },
}));

interface PageProps {
  children?: ReactNode,
  padding?: number,
};

export default function Page({ children, padding = 10 }: PageProps) {
  const { classes } = useStyles();

  return (
    <ScrollArea className={classes.mainContainer} style={{ padding }}>
      {children}
    </ScrollArea>
  );
}
