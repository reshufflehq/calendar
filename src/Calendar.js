import React, { useState, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import EventDialog from './components/EventDialog';
import NewEventDialog from './components/NewEventDialog';

import './main.scss';

const query = gql`
  query GetEvents {
    getEvents {
      id
      title
      start
      end
      description
    }
  }
`;
const Calendar = () => {
  const [openEvent, setOpenEvent] = useState(false);
  const [openNewEvent, setOpenNewEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const { data, loading, error, refetch } = useQuery(query, {
    pollInterval: 1000,
  });

  const handleClickOpen = useCallback(selectedEvent => {
    setSelectedEvent(selectedEvent);
    setOpenEvent(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenEvent(false);
    refetch();
  }, [refetch]);

  const handleClickOpenNewEvent = useCallback(selectedDate => {
    setSelectedDate(selectedDate);
    setOpenNewEvent(true);
  }, []);

  const handleCloseNewEvent = useCallback(() => {
    setOpenNewEvent(false);
    refetch();
  }, [refetch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <p>ERROR</p>;
  const events = data.getEvents;

  return (
    <>
      <div className='calendar'>
        <FullCalendar
          defaultView='dayGridMonth'
          plugins={[dayGridPlugin, interactionPlugin]}
          events={events}
          eventClick={handleClickOpen}
          dateClick={handleClickOpenNewEvent}
        />
      </div>
      <EventDialog
        open={openEvent}
        onClose={handleClose}
        selectedEvent={selectedEvent}
      />
      <NewEventDialog
        open={openNewEvent}
        onClose={handleCloseNewEvent}
        selectedDate={selectedDate}
      />
    </>
  );
};

export default Calendar;
