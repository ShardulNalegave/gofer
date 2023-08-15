import { ReactNode } from 'react';
import { createStyles, ScrollArea } from '@mantine/core';

const useStyles = createStyles((_) => ({
  mainContainer: {
    width: '100%',
    height: '100vh',
    backgroundColor: "#141517",
  },
}));

interface PageProps {
  children?: ReactNode,
  padding?: number,
  scroll: boolean,
};

export default function Page({ children, padding = 10, scroll }: PageProps) {
  const { classes } = useStyles();

  return (
    scroll ?
      <ScrollArea className={classes.mainContainer} style={{ padding }}>
        {children}
      </ScrollArea>
      :
      <div className={classes.mainContainer} style={{ padding, overflowY: 'hidden' }}>
        {children}
      </div>
  );
}
