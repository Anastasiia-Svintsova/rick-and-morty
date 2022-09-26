import React from 'react';

import { Box, Link } from '@mui/material';

import { CosmosBackground } from '../CosmosBackground';
import { useStyles } from '../UIContext';

export const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Box zIndex={2}>
        <CosmosBackground />
      </Box>

      <Link
        href='https://github.com/Anastasiia-Svintsova/rick-and-morty'
        className={classes.linkStyle}
        flexGrow={1}
        textAlign='center'
        underline='none'
        color='white'
      >
        © 2022 Anastasiia Svintsova
      </Link>
    </Box>
  );
};

export default Footer;
