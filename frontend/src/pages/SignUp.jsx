import React, { useState } from "react";

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
    <div style={wrapperStyle}>
      <div style={boxStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <FormGroup label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          <FormGroup label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <FormGroup label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
          <FormGroup label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />

          <button type="submit" style={buttonStyle}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

const FormGroup = ({ label, name, type = "text", value, onChange }) => (
  <div style={{ marginBottom: "15px" }}>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      style={inputStyle}
    />
  </div>
);


const wrapperStyle = {
 
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};


const boxStyle = {
   backgroundColor: "#f5f5f5",
  padding: "30px",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  width: "100%",
  maxWidth: "400px",
};


const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  backgroundColor: "#fff",
};


const buttonStyle = {
  width: "100%",
  padding: "10px",
background: "#232227",
  color: "#b48e70",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default SignUp;
