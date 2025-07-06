import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  Box,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import plLocale from "@fullcalendar/core/locales/pl";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

 
  const getToken = () => localStorage.getItem("token");

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
            eventId: event.event.id,
          },
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => console.error("Błąd:", error.message));
  }, []);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setFeedback("");
    setDialogOpen(true);
    console.log("🆔 eventId:", clickInfo.event.extendedProps.eventId);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setFeedback("");
  };

  const handleJoin = () => {
    const eventId = selectedEvent?.extendedProps?.eventId;
    if (!eventId) return setFeedback("❌ Nie można zapisać – brak ID wydarzenia.");

    fetch(`/api/events/join/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Nie udało się zapisać.");
        setFeedback("✅ Zapisano na wydarzenie!");
      })
      .catch((err) => {
        console.error("❌ Błąd zapisu:", err);
        setFeedback("❌ Błąd zapisu na wydarzenie.");
      });
  };

  const handleQuit = () => {
    const eventId = selectedEvent?.extendedProps?.eventId;
    if (!eventId) return setFeedback("❌ Nie można wypisać – brak ID wydarzenia.");

    fetch(`/api/events/quit/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Nie udało się wypisać.");
        setFeedback("✅ Wypisano z wydarzenia.");
      })
      .catch((err) => {
        console.error("❌ Błąd wypisania:", err);
        setFeedback("❌ Błąd wypisania z wydarzenia.");
      });
  };

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
        eventClick={handleEventClick}
      />

      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>{selectedEvent?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            <strong>Trener:</strong> {selectedEvent?.extendedProps?.coach}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Sala:</strong> {selectedEvent?.extendedProps?.room}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Opis:</strong> {selectedEvent?.extendedProps?.description}
          </Typography>
          {feedback && (
            <Typography
              variant="subtitle2"
              color={feedback.includes("✅") ? "success.main" : "error.main"}
              sx={{ mt: 1 }}
            >
              {feedback}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleJoin} color="primary">
            Zapisz się
          </Button>
          <Button onClick={handleQuit} color="error">
            Wypisz się
          </Button>
          <Button onClick={handleClose}>Zamknij</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar;
