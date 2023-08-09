
import { createStyles, Text, ScrollArea } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  mainContainer: {
    width: '250px',
    height: '100vh',
    backgroundColor: "#141517",
    borderRight: "0.5px solid #242529",
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
