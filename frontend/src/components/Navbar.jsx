import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Barbell } from "phosphor-react";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      px="80px"
      py="20px"
      sx={{ gap: { sm: "20px", xs: "40px" } }}
    >
      {/* LEWA STRONA – logo + linki */}
      <Stack direction="row" alignItems="center" spacing={4}>
        <Link to="/">
          <Barbell
            size={32}
            style={{
              width: "48px",
              height: "48px",
              margin: "0px 15px -10px 10px",
              color: "#010d34",
            }}
          />
        </Link>

        <Stack
          direction="row"
          spacing={4}
          sx={{
            fontFamily: "Alegreya",
            fontSize: "24px",
            alignItems: "flex-end",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#3A1212",
              borderBottom: "3px solid #b48e70",
            }}
          >
            Home
          </Link>
          <Link to="/exercises" style={{ textDecoration: "none", color: "#3A1212" }}>
            Exercises
          </Link>
          <Link to="/offer" style={{ textDecoration: "none", color: "#3A1212" }}>
            Offer
          </Link>

          <Link to="/contact" style={{ textDecoration: "none", color: "#3A1212" }}>
            Contact
          </Link>
        </Stack>
      </Stack>

      {/* PRAWA STRONA – Sign In / Sign Up */}
      <Stack direction="row" spacing={3}>
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "#3A1212",
            fontFamily: "Alegreya",
            fontSize: "24px",
          }}
        >
          Sign In
        </Link>
        <Link
          to="/register"
          style={{
            textDecoration: "none",
            color: "#3A1212",
            fontFamily: "Alegreya",
            fontSize: "24px",
          }}
        >
          Sign Up
        </Link>
      </Stack>
    </Stack>
  );
};

export default Navbar;
