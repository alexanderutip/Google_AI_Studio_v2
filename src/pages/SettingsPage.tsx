import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { AVAILABLE_SYMBOLS } from '../constants';
import { Box, Paper, Typography, FormControlLabel, Switch, Button, Chip, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme, logout, subscribedSymbols, addSymbol, removeSymbol } = useAppContext();
  
  const unsubscribedSymbols = AVAILABLE_SYMBOLS.filter(s => !subscribedSymbols.includes(s));

  const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>
      {children}
    </Paper>
  );

  return (
    <Box sx={{ maxWidth: 'sm', mx: 'auto' }}>
      <Stack spacing={3}>
        <Section title="Appearance">
          <FormControlLabel
            control={<Switch checked={theme === 'dark'} onChange={toggleTheme} />}
            label="Dark Mode"
          />
        </Section>

        <Section title="Manage Symbols">
          <Typography variant="subtitle1" gutterBottom>Subscribed</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {subscribedSymbols.length > 0 ? subscribedSymbols.map(s => (
              <Chip
                key={s}
                label={s}
                onDelete={() => removeSymbol(s)}
                color="primary"
              />
            )) : <Typography variant="body2" color="text.secondary">No symbols subscribed.</Typography>}
          </Box>
          
          <Typography variant="subtitle1" gutterBottom>Available</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {unsubscribedSymbols.map(s => (
              <Chip
                key={s}
                label={s}
                onClick={() => addSymbol(s)}
                onDelete={() => addSymbol(s)}
                deleteIcon={<AddIcon />}
                variant="outlined"
              />
            ))}
          </Box>
        </Section>
        
        <Section title="Account">
            <Button
                onClick={logout}
                variant="outlined"
                color="error"
                fullWidth
            >
                Logout
            </Button>
        </Section>
      </Stack>
    </Box>
  );
};

export default SettingsPage;
