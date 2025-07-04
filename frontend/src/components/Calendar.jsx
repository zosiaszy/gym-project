import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Box, Typography } from "@mui/material";
import plLocale from "@fullcalendar/core/locales/pl";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events/")
      .then((response) => {
        if (!response.ok) throw new Error("Błąd ładowania wydarzeń");
        return response.json();
      })
      .then((data) => {
        const formattedEvents = data.map((event) => ({
          title: event.event.event_type.name,
          start: event.start_time,
          end: event.end_time,
          id: event.id,
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => console.error("Błąd:", error.message));
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "1350px",
        margin: "20px auto",
        backgroundColor: "#fff",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      <Typography fontFamily="Alegreya" fontSize="40px" fontWeight="600" mb={2} color="#232227">
        Calendar
      </Typography>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        id="calendar"
        height="auto"
        locale={plLocale}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        }}
      />
    </Box>
  );
};

export default Calendar;
