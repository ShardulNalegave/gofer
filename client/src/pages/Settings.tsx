
import { createStyles, Text } from '@mantine/core';

import Page from '../components/Page';

const useStyles = createStyles({});

export default function Settings() {
  let {} = useStyles();

  return (
    <Page padding={ 30 } scroll={true}>
      <Text>Settings</Text>
    </Page>
  );
}
