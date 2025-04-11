import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import HeroBannerImage from '../assets/images/start.png';

const HeroBanner = () => (
  <Box
    sx={{
      mt: { lg: '80px', xs: '30px' },
      mx: 'auto',
      display: 'flex',
      flexDirection: { xs: 'column', lg: 'row' },
      gap: { xs: 4, lg: 0 },
      borderRadius: '50px',
      maxWidth: '1350px',
      overflow: 'hidden',
      backgroundColor: '#f5f5f5',
      minHeight: { xs: '60vh', lg: '60vh' },
      px: 0, 
    }}
  >

    <Box
      sx={{
        flex: 1,
        pl: { xs: 2, sm: 15 },
        pr: { xs: 3, sm: 6 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography color="#b48e70" fontWeight="600" fontSize="30px">
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

      <Typography fontSize="24px" fontFamily="Alegreya" lineHeight="35px">
        Discover a place where passion meets performance. 
        <div>Push your limits. <span style={{
       
        color: '#232227', letterSpacing: '4px', fontSize: '24px'}}><b> ELEVATE</b></span> your life.</div>
        
      </Typography>

      <Stack>
        <a
          href="exercises"
          style={{
            marginTop: '45px',
            textDecoration: 'none',
            width: '200px',
            textAlign: 'center',
            background: '#232227',
            padding: '14px',
            fontSize: '22px',
            textTransform: 'none',
            color: '#b48e70',
            borderRadius: '60px',
          }}
        >
          Explore
        </a>
      </Stack>
    </Box>

   
    <Box
      component="img"
      src={HeroBannerImage}
      alt="banner"
      sx={{
        width: { xs: '100%', lg: '650px' },
       minHeight: { xs: '35vh', lg: '60vh' },
        objectFit: 'cover',
        alignSelf: 'stretch',
        borderTopRightRadius: { lg: '50px' },
        borderBottomRightRadius: { lg: '50px' },
      }}
    />
  </Box>
);

export default HeroBanner;
