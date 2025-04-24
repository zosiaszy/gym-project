import React from "react";
import { Box, Button, Typography } from "@mui/material";
import MembershipImage from "../assets/images/member.png";

const BuyMembership = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", lg: "row" },

      justifyContent: "center",
      gap: { xs: 4, lg: 0 },
      mt: { lg: "140px", xs: "30px" },
      mx: "auto",
      maxWidth: "1350px",
      minHeight: { xs: "60vh", lg: "60vh" },

      borderRadius: "50px",
      overflow: "hidden",
    }}
  >
    <Box
      component="img"
      src={MembershipImage}
      alt="Buy membership"
      sx={{
        width: { xs: "100%", lg: "650px" },
        minHeight: { xs: "35vh", lg: "70vh" },
        mt: { lg: "80px", xs: "30px" },
        borderTopLeftRadius: { lg: "50px" },
        borderBottomLeftRadius: { lg: "50px" },
      }}
    />

    {/* PRAWA STRONA – TEKST + PRZYCISK */}
    <Box
      sx={{
        flex: 1,
        backgroundColor: "#f5f5f5",
        pl: { xs: 2, sm: 15 },
        pr: { xs: 3, sm: 10 },
        display: "flex",
        minHeight: { xs: "35vh", lg: "70vh" },
        mt: { lg: "80px", xs: "30px" },
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h4"
        fontFamily="Alegreya"
        fontSize="40px"
        fontWeight="600"
        mb={2}
        color="#232227"
      >
        READY for change?
      </Typography>
      <Typography variant="body1" fontFamily="Alegreya" fontSize="24px" mb={2}>
        Choose the perfect membership for yourself and join a community that values health and
        fitness! Start your transformation today.
      </Typography>
      <Button
        variant="contained"
        fontFamily="Alegreya"
        sx={{
          backgroundColor: "#232227",
          marginTop: "10px",
          textDecoration: "none",
          width: "200px",
          textAlign: "center",

          padding: "10px",
          fontSize: "20px",
          textTransform: "none",
          color: "#b48e70",
          borderRadius: "60px",
        }}
      >
        Join now
      </Button>
    </Box>
  </Box>
);

export default BuyMembership;
