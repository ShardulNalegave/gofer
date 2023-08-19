
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { IconCalendar } from '@tabler/icons-react';
import { useQuery, useSubscription } from '@apollo/client';
import { createStyles, Grid, Text, Title, Button } from '@mantine/core';

import { queries, subscriptions } from '../api/api';
import Page from '../components/Page';
import ActivityWidget from '../components/ActivityWidget';
import Spacer from '../components/Spacer';
import { useEffect, useState } from 'react';

const useStyles = createStyles({
  greetingText: {
    fontSize: '60px',
  },
});

export default function Dashboard() {
  let { classes } = useStyles();
  let navigate = useNavigate();

  let queryResult = useQuery(queries.LOGGED_IN_USER_DATA);
  let subscriptionResult = useSubscription(subscriptions.LOGGED_IN_USER_DATA_SUB);
  let [ loadedQuery, setLoadedQuery ] = useState(false);
  let [ userData, setUserData ] = useState({});

  useEffect(() => {
    if (!loadedQuery && queryResult.data && !queryResult.loading) {
      setUserData(queryResult.data.loggedInUserData);
      setLoadedQuery(true);
    } else if(!subscriptionResult.loading && subscriptionResult.data) {
      setUserData(subscriptionResult.data.loggedInUserData);
    }
  }, [queryResult.loading, subscriptionResult.loading]);

  return (
    <Grid gutter={ 0 }>
      <Grid.Col span="auto" style={{ padding: '0px', height: '100vh' }}>
        <Page scroll padding={30}>
          <Spacer height={25} />
          <Button variant='light' leftIcon={ <IconCalendar /> } onClick={() => { navigate('/calendar') }}>
            {moment().format("MMMM Do YYYY")}
          </Button>
          <Spacer height={15} />
          <Title className={ classes.greetingText }>Hello, Shardul</Title>
          <Spacer height={12} />
          <Text className='mono-font'>Get an overview of your projects and teams here.</Text>
          <Text>{`${userData.email}`}</Text>
        </Page>
      </Grid.Col>
      <Grid.Col span="content">
        <ActivityWidget />
      </Grid.Col>
    </Grid>
  );
}
