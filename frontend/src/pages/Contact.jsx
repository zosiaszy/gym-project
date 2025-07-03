import React from "react";
import { Box, Typography } from "@mui/material";

const Contact = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", lg: "row" },

      justifyContent: "center",
      gap: { xs: 4, lg: 0 },
      mt: { lg: "50px", xs: "30px" },
      mx: "auto",
      maxWidth: "1350px",
      minHeight: { xs: "60vh", lg: "60vh" },
      backgroundColor: "#f5f5f5",
      borderRadius: "50px",
      overflow: "hidden",
    }}
  >
    <Box
      component="img"
      src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      alt="Buy membership"
      sx={{
        width: { xs: "100%", lg: "650px" },
        minHeight: { xs: "35vh", lg: "70vh" },
        objectFit: "cover",
        borderTopLeftRadius: { lg: "50px" },
        borderBottomLeftRadius: { lg: "50px" },
      }}
    />

    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },

        justifyContent: "center",
        gap: { xs: 4, lg: 0 },

        mx: "auto",
        maxWidth: "750px",
        minHeight: { xs: "60vh", lg: "40vh" },
        backgroundColor: "#f5f5f5",
        borderTopRightRadius: "50px",
        borderBottomRightRadius: "50px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#f5f5f5",
          pl: { xs: 2, sm: 10 },
          pr: { xs: 3, sm: 10 },
          display: "flex",
          minHeight: { xs: "35vh", lg: "60vh" },
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          fontFamily="Alegreya"
          fontSize="45px"
          fontWeight="600"
          mb={2}
          color="#b48e70"
        >
          CONTACT US
        </Typography>
        <Typography variant="body1" fontFamily="Alegreya" fontSize="26px" mb={2}>
          If you have any questions, <b> feel free to reach out</b>.
        </Typography>
        <Typography variant="body1" fontFamily="Alegreya" fontSize="22px" mb={2}>
          <b>Email:</b> elevate@fitness.com
        </Typography>
        <Typography variant="body1" fontFamily="Alegreya" fontSize="22px" mb={2}>
          <b>Phone:</b> +48 433 222 987
        </Typography>
        <Typography variant="body1" fontFamily="Alegreya" fontSize="18px" mb={2}>
          If you want to settle your outstanding payments, please use the account number:{" "}
          <b>14 1000 1063 0000 0021 3371 1952</b>
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default Contact;
