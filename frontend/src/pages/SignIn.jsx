import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong...");
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        login(); 
        navigate("/offer");
      })
      .catch(() => {
        alert("Incorrect username or password...");
      });
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
        <Typography textAlign="center" mb={3} fontWeight="bolder">
          SIGN IN
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Username"
            name="username"
            type="text"
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
  maxWidth: "400px",
  marginTop: "-100px",
  height: "30vh",
};

const buttonStyle = {
  padding: "12px",
  width: "400px",
  backgroundColor: "#232227",
  color: "#b48e70",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#3a393f",
  },
};

export default SignIn;
