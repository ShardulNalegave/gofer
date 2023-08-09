
import {
  createStyles,
  Text,
  Title,
  Image,
  Center,
  Divider,
  ScrollArea,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
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
        <div style={{ height: '25px' }}></div>
        <Title style={{ fontSize: '20px' }}>Shardul Nalegave</Title>
        <div style={{ height: '5px' }}></div>
        <Text className='mono-font' style={{ fontSize: '13px' }}>nalegaveshardul40@gmail.com</Text>
      </div>
      <div style={{ height: '15px' }}></div>
      <Divider label='Activity' labelPosition='center' />
      <div style={{ height: '15px' }}></div>
    </main>
  );
}
