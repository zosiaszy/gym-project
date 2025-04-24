import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { CaretCircleRight } from "phosphor-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dane z formularza:", formData);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        backgroundColor: "#fafafa",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <Box sx={boxStyle}>
          <Typography
            variant="h5"
            textAlign="center"
            mb={3}
            fontWeight="bolder"
          >
            SIGN UP
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormGroup
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <FormGroup
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <FormGroup
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <FormGroup
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <FormGroup
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" sx={buttonStyle}>
              SIGN UP
            </Button>
          </form>
        </Box>

        {/* Karta informacyjna */}
        <Box sx={infoBoxStyle}>
          <Typography
            variant="h5"
            textAlign="center"
            mb={2}
            color="#b48e70"
            fontWeight="bolder"
          >
            JOIN US
          </Typography>

          {[
            "Buy a membership now, join our club and feel free to grow with our workout plan",
            "Our gym is open 24/7 so you can workout anytime you want.",
            "Buy a membership today and get access to top — tier workouts and personal trainer support.",
          ].map((text, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="flex-start"
              mb={2}
              mt={2}
            >
              <CaretCircleRight
                size={32}
                style={{ marginRight: 10, flexShrink: 0 }}
              />
              <Typography variant="body1" lineHeight="1.5">
                {text}
              </Typography>
            </Box>
          ))}

          <Typography
            style={{ fontSize: 11, fontStyle: "italic", textAlign: "justify" }}
          >
            Your rights in connection with the processing of personal data: The
            right to request access to personal data; the right to request
            rectification of personal data; the right to request erasure of
            personal data; the right to request restriction of processing of
            personal data, the right to object to the processing of personal
            data; the right to portability of personal data; the right to
            withdraw consent to the processing of personal data; and the right
            to lodge a complaint with the President of the Office for Personal
            Personal Personal Data Protection.
          </Typography>
          <Typography mt={1} style={{ fontSize: 14, textAlign: "justify" }}>
            <b>Email:</b> elevate@fitness.com
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const FormGroup = ({ label, name, type = "text", value, onChange }) => (
  <Box mb={2}>
    <TextField
      fullWidth
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
    />
  </Box>
);

const boxStyle = {
  backgroundColor: "#f5f5f5",
  padding: "50px",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  width: "100%",
  maxWidth: "350px",
};

const infoBoxStyle = {
  backgroundColor: "#fff",
  padding: "50px",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  width: "100%",
  maxWidth: "350px",
  display: "flex",
  flexDirection: "column",
};

const buttonStyle = {
  padding: "12px",
  backgroundColor: "#232227",
  color: "#b48e70",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#3a393f",
  },
};

export default SignUp;
