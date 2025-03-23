import React from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router";
import { Barbell } from "phosphor-react";

const Navbar = () =>{
  return (
   <>
     <Stack direction="row" justifyContent="space-around" sx={{ gap: { sm: '20px', xs: '40px' }, mt: { sm: '32px', xs: '20px' }, justifyContent: 'flex-start' }} px="80px">
    <Link to="/">
      <Barbell size={32} style={{ width: '48px', height: '48px', margin: '0px 15px -10px 10px ', color: '#F1058D'}}/>
    </Link>
    <Stack
      direction="row"
      gap="40px"
      fontFamily="Alegreya"
      fontSize="24px"
      alignItems="flex-end"
      marginInlineEnd="40px"
    >
      <Link to="/" style={{ textDecoration: 'none', color: '#3A1212', borderBottom: '3px solid #F1058D' }}>Home</Link>
 

      <Link to="/about" style={{ textDecoration: 'none', color: '#3A1212' }}>About</Link>
       <Link to="/contact" style={{ textDecoration: 'none', color: '#3A1212' }}>Contact</Link>
   
    </Stack>
  </Stack>
    </>
   
  );
}

export default Navbar;
