
import { createStyles, Text, ScrollArea } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  mainContainer: {
    width: '350px',
    height: '100vh',
    backgroundColor: "#141517",
    borderLeft: "0.5px solid #242529",
  }
}));

export default function ActivityWidget() {
  const { classes } = useStyles();

  return (
    <ScrollArea className={classes.mainContainer}>
      <Text>Activity</Text>
    </ScrollArea>
  );
}
