
import {
  createStyles,
  Text,
  Title,
  Image,
  Center,
  Divider,
} from '@mantine/core';
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
        <Title style={{ fontSize: '20px' }}>Shardul Nalegave</Title>
        <Spacer height={5} />
        <Text className='mono-font' style={{ fontSize: '13px' }}>nalegaveshardul40@gmail.com</Text>
      </div>
      <Spacer height={15} />
      <Divider label='Activity' labelPosition='center' />
      <Spacer height={15} />
    </main>
  );
}
