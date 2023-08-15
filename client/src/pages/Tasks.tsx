
import { createStyles, Text } from '@mantine/core';

import Page from '../components/Page';

const useStyles = createStyles({});

export default function Tasks() {
  let {} = useStyles();

  return (
    <Page padding={ 30 } scroll={true}>
      <Text>Tasks</Text>
    </Page>
  );
}
