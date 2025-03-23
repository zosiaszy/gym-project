import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import HeroBannerImage from '../assets/images/gym-banner.jpg';

const HeroBanner = () => (
  <Box
    sx={{
      mt: { lg: '50px', xs: '40px' },
      mx: 'auto',
      display: 'flex',
      flexDirection: { xs: 'column', lg: 'row' },
      boxShadow: '0px 4px 20px rgba(241, 5, 141, 0.2)',
      gap: { xs: 4, lg: 0 },
      borderRadius: '50px',
      maxWidth: '1350px',
      overflow: 'hidden',
      backgroundColor: '#fff',
      minHeight: { xs: '90vh', lg: '80vh' },
      px: 0, 
    }}
  >
    {/* LEWA STRONA – tekst */}
    <Box
      sx={{
        flex: 1,
        pl: { xs: 3, sm: 6 },
        pr: { xs: 3, sm: 6 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography color="#F1058D" fontWeight="600" fontSize="30px">
        Gym & Health
      </Typography>
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '50px', xs: '40px' } }}
        mb="23px"
        mt="30px"
      >
        ELEVATE fitness
      </Typography>

      <Typography fontSize="22px" fontFamily="Alegreya" lineHeight="35px">
        Discover a place where passion meets performance. 
        <div>Push your limits. <span style={{
       
            color: '#F1058D', letterSpacing: '4px', fontSize: '24px'}}><b> ELEVATE</b></span> your life.</div>
        
      </Typography>

      <Stack>
        <a
          href="#exercises"
          style={{
            marginTop: '45px',
            textDecoration: 'none',
            width: '200px',
            textAlign: 'center',
            background: '#F1058D',
            padding: '14px',
            fontSize: '22px',
            textTransform: 'none',
            color: 'white',
            borderRadius: '60px',
          }}
        >
          Explore
        </a>
      </Stack>
    </Box>

    {/* PRAWA STRONA – obrazek */}
    <Box
      component="img"
      src={HeroBannerImage}
      alt="banner"
      sx={{
        width: { xs: '100%', lg: '700px' },
       minHeight: { xs: '40vh', lg: '80vh' },
        objectFit: 'cover',
        alignSelf: 'stretch',
        borderTopRightRadius: { lg: '50px' },
        borderBottomRightRadius: { lg: '50px' },
      }}
    />
  </Box>
);

export default HeroBanner;
