import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Box } from '@mui/material';
import plLocale from '@fullcalendar/core/locales/pl';


const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Przykładowe pobieranie danych z backendu
    fetch('https://your-api-endpoint.com/events') // <-- Zastąp własnym URL!
      .then(response => response.json())
      .then(data => {
        // Jeśli potrzebujesz przekształcić dane do formatu używanego przez FullCalendar
        // Sprawdź dokumentację FullCalendar, oczekuje ona np. [{ title, date, ... }]
        setEvents(data);
      })
      .catch(error => console.error('Błąd ładowania wydarzeń:', error));
  }, []);

  return (
    <Box
      style={{
           maxWidth: '1350px',
            margin: '80px auto',
            backgroundColor: '#fff',
            borderRadius: '50px',
            overflow: 'hidden',
            padding: '20px',
      }}
    >
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        locale={plLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth'
        }}
      />
    </Box>
  );
};

export default Calendar;
