
import {
  createStyles,
  Text,
  Title,
  Image,
  Center,
  Divider,
  Chip,
} from '@mantine/core';

import Spacer from './Spacer';
import { useLoggedInUserData } from '../contexts/loggedInUserData';

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
  let { userData } = useLoggedInUserData();

  return (
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
        <Title style={{ fontSize: '20px' }}>{userData.name}</Title>
        <Spacer height={5} />
        <Text className='mono-font' style={{ fontSize: '13px' }}>{userData.email}</Text>
        <Spacer height={15} />
        <div>{userData.roles.map((role: any) => {
          return <Chip checked={false} key={role.id}>{role.title}</Chip>
        })}</div>
      </div>
      <Spacer height={15} />
      <Divider label='Activity' labelPosition='center' />
      <Spacer height={15} />
    </main>
  );
}
