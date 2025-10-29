import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { quotesService } from '../services/quotesService';
import { Quote } from '../types';
import SymbolCard from '../components/SymbolCard';
import { Grid, Box, Typography } from '@mui/material';

const DashboardPage: React.FC = () => {
  const { subscribedSymbols } = useAppContext();
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});

  useEffect(() => {
    const handleNewQuote = (quote: Quote) => {
      setQuotes(prevQuotes => ({
        ...prevQuotes,
        [quote.symbol]: quote,
      }));
    };

    quotesService.subscribe(subscribedSymbols, handleNewQuote);
    
    // Initialize with some data
    subscribedSymbols.forEach(symbol => {
      handleNewQuote({symbol, price: 0, change: 0});
    });

    return () => {
      quotesService.unsubscribe(subscribedSymbols, handleNewQuote);
    };
  }, [subscribedSymbols]);
  
  if (subscribedSymbols.length === 0) {
    return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              No Symbols Subscribed
            </Typography>
            <Typography color="text.secondary">
              Go to settings to add symbols to your dashboard.
            </Typography>
        </Box>
    )
  }

  return (
    <Grid container spacing={2}>
      {subscribedSymbols.map(symbol => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={symbol}>
          <SymbolCard symbol={symbol} initialQuote={quotes[symbol] || null} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardPage;
