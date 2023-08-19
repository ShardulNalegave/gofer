
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { IconCalendar } from '@tabler/icons-react';
import { createStyles, Grid, Text, Title, Button, Center, Loader } from '@mantine/core';

import { queries } from '../api/api';
import Page from '../components/Page';
import ActivityWidget from '../components/ActivityWidget';
import Spacer from '../components/Spacer';

const useStyles = createStyles({
  greetingText: {
    fontSize: '60px',
  },
});

export default function Dashboard() {
  let { classes } = useStyles();
  let navigate = useNavigate();
  let { loading, data, error } = useQuery(queries.LOGGED_IN_USER_DATA, {
    variables: {},
    pollInterval: 1000,
  });

  return (
    (!loading && !error) ?
      <Grid gutter={ 0 }>
        <Grid.Col span="auto" style={{ padding: '0px', height: '100vh' }}>
          <Page scroll padding={30}>
            <Spacer height={25} />
            <Button variant='light' leftIcon={ <IconCalendar /> } onClick={() => { navigate('/calendar') }}>
              {moment().format("MMMM Do YYYY")}
            </Button>
            <Spacer height={15} />
            <Title className={ classes.greetingText }>Hello, {data.loggedInUserData.name.split(" ")[0]}</Title>
            <Spacer height={12} />
            <Text className='mono-font'>Get an overview of your projects and teams here.</Text>
          </Page>
        </Grid.Col>
        <Grid.Col span="content">
          <ActivityWidget />
        </Grid.Col>
      </Grid>
      :
      <Page scroll={false} padding={0}>
        <Center style={{ height: '100vh' }}>
          <Loader />
        </Center>
      </Page>
  );
}
