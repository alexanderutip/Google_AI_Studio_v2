import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Link } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Header: React.FC = () => {
  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <Link component={RouterLink} to="/" underline="none" color="inherit" sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            TradeApp
          </Typography>
        </Link>
        <IconButton
          component={RouterLink}
          to="/settings"
          color="inherit"
          aria-label="settings"
        >
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
