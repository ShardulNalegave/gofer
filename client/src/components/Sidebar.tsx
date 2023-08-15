
import { useLocation } from 'react-router-dom';
import { IconHome, IconCalendar, IconSettings } from '@tabler/icons-react';
import { createStyles, Grid, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { useGoToRoute } from '../hooks/useGoToRoute';

const useStyles = createStyles((_) => ({
  mainContainer: {
    width: '250px',
    height: '100vh',
    backgroundColor: "#141517",
    borderRight: "0.5px solid #242529",
    padding: '15px',
  }
}));

export default function Sidebar() {
  const { classes } = useStyles();

  return (
    <main className={classes.mainContainer}>
      <SidebarButton to='/dashboard' icon={ <IconHome /> } title='Home' />
      <SidebarButton to='/calendar' icon={ <IconCalendar /> } title='Calendar' />
      <SidebarButton to='/settings' icon={ <IconSettings /> } title='Settings' />
    </main>
  );
}

const useStyles_SidebarButton = createStyles((_) => ({
  mainContainer: {
    cursor: 'pointer',
    width: '100%',
    padding: '15px',
  },
  activeMainContainer: {
    cursor: 'pointer',
    width: '100%',
    padding: '15px',
    color: '#90CAF9',
    fontWeight: 'bolder',
  }
}));


interface SidebarButtonProps {
  to: string,
  icon: ReactNode,
  title: string,
}

export function SidebarButton({
  to, icon, title,
} : SidebarButtonProps) {
  let goToRoute = useGoToRoute();
  let loc = useLocation();
  let { classes } = useStyles_SidebarButton();

  return (
    <Grid gutter={0} onClick={() => goToRoute(to)} className={loc.pathname == to ? classes.activeMainContainer : classes.mainContainer}>
      <Grid.Col span='content'>
        {icon}
      </Grid.Col>
      <Grid.Col span='auto' style={{ paddingLeft: '15px' }}>
        <Text className='heading-font'>{title}</Text>
      </Grid.Col>
    </Grid>
  );
}