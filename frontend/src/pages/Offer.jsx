import React, { useState } from "react";
import { plansData } from "../data/plansData";
import { Barbell } from "phosphor-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import "./Offer.css";

const icons = {
  Barbell: Barbell,
};

const Offer = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleJoinClick = (planName) => {
    const token = localStorage.getItem("token");

    fetch("/api/offers/", {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Token ${token}` }),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Błąd pobierania ofert");
        return res.json();
      })
      .then((data) => {
        const matched = data.find((offer) =>
          offer.name.toLowerCase().includes(planName.toLowerCase())
        );
        if (matched) {
          setSelectedOffer(matched);
          setOpenDialog(true);

          if (token) {
            fetch("/api/offers/select/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
              },
              body: JSON.stringify({ offer_id: matched.id }),
            })
              .then((res) => {
                if (!res.ok) throw new Error("Błąd zapisu oferty");
                return res.json();
              })
              .then(() => setFeedback("✅ Wybrano ofertę."))
              .catch(() => setFeedback("❌ Nie udało się wybrać oferty."));
          } else {
            setFeedback("ℹ️ Zaloguj się, aby zapisać się na ofertę.");
          }
        } else {
          alert("Nie znaleziono tej oferty.");
        }
      })
      .catch((err) => {
        console.error("❌ Błąd pobierania oferty:", err);
        setFeedback("❌ Wystąpił błąd podczas pobierania oferty.");
      });
  };

  return (
    <div className="plans-container">
      <div className="plans">
        {plansData.map((plan, i) => (
          <div key={i} className="plan">
            {React.createElement(icons[plan.icon], { size: 30 })}
            <h2>{plan.name}</h2>
            <p>${plan.price}</p>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <div>
              <span>See more benefits ↓</span>
            </div>
            <button
              className="btn join-btn"
              onClick={() => handleJoinClick(plan.name)}
            >
              Join us
            </button>
          </div>
        ))}
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{selectedOffer?.name}</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <strong>Opis:</strong> {selectedOffer?.description}
          </Typography>
          <Typography gutterBottom>
            <strong>Cena:</strong> {selectedOffer?.price} zł
          </Typography>
          <Typography gutterBottom>
            <strong>Czas trwania:</strong> {selectedOffer?.duration_days} dni
          </Typography>
          {feedback && (
            <Typography
              variant="subtitle2"
              color={
                feedback.includes("✅")
                  ? "success.main"
                  : feedback.includes("ℹ️")
                  ? "info.main"
                  : "error.main"
              }
              sx={{ mt: 2 }}
            >
              {feedback}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Zamknij</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Offer;
