
import { useQuery } from '@apollo/client';
import {
  createStyles,
  Text,
  Title,
  Image,
  Center,
  Divider,
  Loader,
  Chip,
} from '@mantine/core';

import { queries } from '../api/api';
import Spacer from './Spacer';

const useStyles = createStyles((_) => ({
  mainContainer: {
    width: '400px',
    height: '100vh',
    backgroundColor: "#141517",
    borderLeft: "0.5px solid #242529",
    padding: '20px',
  },
  profileWidget: {
    padding: '25px',
    backgroundColor: '#1A1B1E',
    borderRadius: '10px',
    textAlign: 'center',
  },
}));

export default function ActivityWidget() {
  const { classes } = useStyles();
  let { loading, data, error } = useQuery(queries.LOGGED_IN_USER_DATA, {
    variables: {},
    pollInterval: 1000,
  });

  return (
    (!loading && !error) ?
      <main className={classes.mainContainer}>
        <div className={classes.profileWidget}>
          <Center>
            <Image
              radius='100%'
              src="https://cdn.vectorstock.com/i/preview-1x/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg"
              height={75}
              width={75}
              withPlaceholder
            ></Image>
          </Center>
          <Spacer height={25} />
          <Title style={{ fontSize: '20px' }}>{data.loggedInUserData.name}</Title>
          <Spacer height={5} />
          <Text className='mono-font' style={{ fontSize: '13px' }}>{data.loggedInUserData.email}</Text>
          <Spacer height={15} />
          <div>{data.loggedInUserData.roles.map((role: any) => {
            return <Chip checked={false}>{role.title}</Chip>
          })}</div>
        </div>
        <Spacer height={15} />
        <Divider label='Activity' labelPosition='center' />
        <Spacer height={15} />
      </main>
      :
      <div style={{ backgroundColor: '#141517', overflowY: 'hidden', padding: '0px' }}>
        <Center style={{ height: '100vh' }}>
          <Loader />
        </Center>
      </div>
  );
}
