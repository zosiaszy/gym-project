import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserMenu = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout(); // usuwa token i aktualizuje stan
    handleMenuClose();
    navigate("/");
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <Avatar sx={{ bgcolor: "#232227", width: 36, height: 36 }}>U</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => { navigate("/orders"); handleMenuClose(); }}>
          Order History
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
