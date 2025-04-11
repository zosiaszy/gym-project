import React from 'react';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import { FacebookLogo, InstagramLogo, YoutubeLogo } from 'phosphor-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        py: 4,
        mt: 10,
        borderTop: '1px solid #232227',
        
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ maxWidth: '1350px', mx: 'auto', px: 3 }}
      >
        <Typography variant="body2" color="#232227" fontWeight={600} fontFamily="Alegreya" fontSize={20}>
          © {currentYear} Elevate Fitness. All rights reserved.
        </Typography>

        <Stack direction="row" spacing={1}>
          <IconButton
            href="https://facebook.com"
            target="_blank"
            rel="noopener"
            sx={{ color: '#232227' }}
            aria-label="Facebook"
          >
            <FacebookLogo size={30} weight="fill" />
          </IconButton>
          <IconButton
            href="https://instagram.com"
            target="_blank"
            rel="noopener"
            sx={{ color: '#232227' }}
            aria-label="Instagram"
          >
            <InstagramLogo size={30} weight="fill" />
          </IconButton>
          <IconButton
            href="https://youtube.com"
            target="_blank"
            rel="noopener"
            sx={{ color: '#232227' }}
            aria-label="YouTube"
          >
            <YoutubeLogo size={30} weight="fill" />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
