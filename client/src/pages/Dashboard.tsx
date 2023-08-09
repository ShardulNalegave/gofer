
import moment from 'moment';
import { IconCalendar } from '@tabler/icons-react';
import { createStyles, Grid, Text, Title, Button } from '@mantine/core';

import Page from '../components/Page';
import ActivityWidget from '../components/ActivityWidget';

const useStyles = createStyles({
  greetingText: {
    fontSize: '60px',
  },
});

export default function Dashboard() {
  let { classes } = useStyles();

  return (
    <Page padding={ 0 }>
      <Grid gutter={ 0 }>
        <Grid.Col span="auto" style={{ padding: '30px', height: '100vh' }}>
          <div style={{ height: '25px' }}></div>
          <Button variant='light' leftIcon={ <IconCalendar /> }>
            {moment().format("MMMM Do YYYY")}
          </Button>
          <div style={{ height: '15px' }}></div>
          <Title className={ classes.greetingText }>Hello, Shardul</Title>
          <div style={{ height: '12px' }}></div>
          <Text className='mono-font'>Get an overview of your projects and teams here.</Text>
        </Grid.Col>
        <Grid.Col span="content">
          <ActivityWidget />
        </Grid.Col>
      </Grid>
    </Page>
  );
}
