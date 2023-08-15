
import { createStyles } from '@mantine/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


import Page from '../components/Page';

const useStyles = createStyles({
  greetingText: {
    fontSize: '60px',
  },
});

export default function Calendar() {
  let {} = useStyles();

  return (
    <Page padding={ 30 } scroll={false}>
      <FullCalendar
        height='100%'
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
      />
    </Page>
  );
}
