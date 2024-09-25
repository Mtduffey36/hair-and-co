import React from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = ({ events }) => {
  return (
    <div style={{ height: '700px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        views={['day', 'week', 'agenda']}
        defaultView="week"
        min={new Date(0, 0, 0, 9, 0, 0)}
        max={new Date(0, 0, 0, 17, 0, 0)}
        defaultDate={events.length > 0 ? events[0].start : new Date()}
      />
    </div>
  );
};

export default MyCalendar;