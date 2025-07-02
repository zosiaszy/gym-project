import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Box, Typography } from "@mui/material";
import plLocale from "@fullcalendar/core/locales/pl";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/events")
      .then((response) => response.json())
      .then((data) => {
        const transformed = data.map((item) => ({
          id: item.event.id,
          title: `${item.event.event_type.name} (${item.event.coach.firstname} ${item.event.coach.lastname})`,
          start: item.start_time,
          end: item.end_time,
        }));
        setEvents(transformed);
      })
      .catch((error) => console.error("Błąd ładowania wydarzeń:", error));
  }, []);

  return (
    <Box
      style={{
        maxWidth: "1350px",
        margin: "20px auto",
        backgroundColor: "#fff",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      <Typography fontFamily="Alegreya" fontSize="40px" fontWeight="600" mb={2} color="#232227">
        Schedule
      </Typography>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridWeek"
        events={events}
        height="auto"
        locale={plLocale}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
        }}
      />
    </Box>
  );
};


export default Calendar;