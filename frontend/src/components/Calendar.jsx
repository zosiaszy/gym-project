import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Box, Typography, Tooltip } from "@mui/material";
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
          extendedProps: {
            description: event.event.event_type.description,
            coach: `${event.event.coach.firstname} ${event.event.coach.lastname}`,
            room: event.room.name,
          },
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
        eventContent={(arg) => {
          const { description, coach, room } = arg.event.extendedProps || {};
          console.log("DEBUG event props:", arg.event); // <-- Sprawdź w konsoli
          return (
            <Tooltip
              title={
                <Box sx={{ p: 1 }}>
                  <div><strong>Trener:</strong> {coach}</div>
                  <div><strong>Opis:</strong> {description}</div>
                  <div><strong>Sala:</strong> {room}</div>
                </Box>
              }
              arrow
              placement="top"
            >
              <div>
                <b>{arg.timeText}</b> <i>{arg.event.title}</i>
              </div>
            </Tooltip>
          );
        }}
      />
    </Box>
  );
};

export default Calendar;
