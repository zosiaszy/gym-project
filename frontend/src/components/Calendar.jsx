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
          id: event.id,
          title: event.event.event_type.name,
          start: event.start_time,
          end: event.end_time,
          extendedProps: {
            coach: `${event.event.coach.firstname} ${event.event.coach.lastname}`,
            description: event.event.event_type.description,
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
        locale={plLocale}
        height="auto"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        }}
        eventContent={(arg) => {
          const { event, timeText } = arg;
          return (
            <Tooltip
              title={
                <Box
                  sx={{
                    color: "white",
                    p: 2,
                    borderRadius: 2,
                    fontSize: "16px",
                    lineHeight: 1.6,
                    maxWidth: "250px",
                  }}
                >
                  <div>
                    <strong>Trener:</strong> {event.extendedProps.coach}
                  </div>
                  <div>
                    <strong>Godzina:</strong> {timeText}
                  </div>
                  <div>
                    <strong>Sala:</strong> {event.extendedProps.room}
                  </div>
                  <div>
                    <strong>Opis:</strong> {event.extendedProps.description}
                  </div>
                </Box>
              }
              arrow
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  width: "100%",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#1e2a78",
                  padding: "4px",
                }}
              >
                <div>{timeText}</div>
                <div>{event.title}</div>
              </Box>
            </Tooltip>
          );
        }}
      />
    </Box>
  );
};

export default Calendar;
