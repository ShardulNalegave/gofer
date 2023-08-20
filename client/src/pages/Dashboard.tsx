
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { IconCalendar } from '@tabler/icons-react';
import { createStyles, Grid, Text, Title, Button } from '@mantine/core';

import { useLoggedInUserData } from '../contexts/loggedInUserData';
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
  let { userData } = useLoggedInUserData();

  return (
    <Grid gutter={ 0 }>
      <Grid.Col span="auto" style={{ padding: '0px', height: '100vh' }}>
        <Page scroll padding={30}>
          <Spacer height={25} />
          <Button variant='light' leftIcon={ <IconCalendar /> } onClick={() => { navigate('/calendar') }}>
            {moment().format("MMMM Do YYYY")}
          </Button>
          <Spacer height={15} />
          <Title className={ classes.greetingText }>Hello, {userData.name.split(" ")[0]}</Title>
          <Spacer height={12} />
          <Text className='mono-font'>Get an overview of your projects and teams here.</Text>
        </Page>
      </Grid.Col>
      <Grid.Col span="content">
        <ActivityWidget />
      </Grid.Col>
    </Grid>
  );
}
