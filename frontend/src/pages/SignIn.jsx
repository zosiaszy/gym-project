import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://127.0.0.1:8000/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Błąd logowania");
    }
    const data = await response.json();
    const token = data.token;
    document.cookie = `auth_token=${token}; path=/;`;
  } catch (error) {/*Gdzie się wyświetla errory?*/}
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fafafa",
      }}
    >
      <Box sx={boxStyle}>
        <Typography variant="h5" textAlign="center" mb={3} fontWeight="bolder">
          SIGN IN
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="username"
            name="username"
            type="username"
            value={formData.username}
            onChange={handleChange}
          />
          <FormGroup
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" sx={buttonStyle}>
            SIGN IN
          </Button>
        </form>
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
  backgroundColor: "#fff",
  padding: "50px",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  width: "100%",
  maxWidth: "350px",
  marginTop: "-100px",
  height: "30vh",
};

const buttonStyle = {
  padding: "12px",
  marginTop: "25px",
  backgroundColor: "#232227",
  color: "#b48e70",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#3a393f",
  },
};

export default SignIn;
