
import { createStyles, Text } from '@mantine/core';

import Page from '../components/Page';

const useStyles = createStyles({
  greetingText: {
    fontSize: '60px',
  },
});

export default function Settings() {
  let { classes } = useStyles();

  return (
    <Page padding={ 30 } scroll={true}>
      <Text>Settings</Text>
    </Page>
  );
}
