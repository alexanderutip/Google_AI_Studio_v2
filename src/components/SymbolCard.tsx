import React, { useState, useEffect, useRef } from 'react';
import { Quote } from '../types';
import { Card, CardContent, Typography, Box, Button, useTheme } from '@mui/material';

interface SymbolCardProps {
  symbol: string;
  initialQuote: Quote | null;
}

const SymbolCard: React.FC<SymbolCardProps> = ({ symbol, initialQuote }) => {
  const [quote, setQuote] = useState<Quote | null>(initialQuote);
  const [flash, setFlash] = useState<'green' | 'red' | ''>('');
  const prevPrice = useRef<number | undefined>(initialQuote?.price);
  const theme = useTheme();

  useEffect(() => {
    if (initialQuote && initialQuote.symbol === symbol) {
      if (prevPrice.current !== undefined) {
        if (initialQuote.price > prevPrice.current) {
          setFlash('green');
        } else if (initialQuote.price < prevPrice.current) {
          setFlash('red');
        }
      }
      prevPrice.current = initialQuote.price;
      setQuote(initialQuote);

      const timer = setTimeout(() => setFlash(''), 300);
      return () => clearTimeout(timer);
    }
  }, [initialQuote, symbol]);

  const getFlashColor = () => {
    if (flash === 'green') return theme.palette.mode === 'dark' ? 'rgba(52, 211, 153, 0.2)' : 'rgba(16, 185, 129, 0.2)';
    if (flash === 'red') return theme.palette.mode === 'dark' ? 'rgba(248, 113, 113, 0.2)' : 'rgba(239, 68, 68, 0.2)';
    return undefined;
  };

  const textColor = quote && quote.change >= 0 ? 'greenTrade.main' : 'redTrade.main';

  return (
    <Card sx={{ 
      transition: 'background-color 0.3s ease-in-out',
      backgroundColor: getFlashColor()
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Typography variant="h6" component="h3" fontWeight="bold">
            {symbol}
          </Typography>
          <Button size="small" variant="text">
            Info
          </Button>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h5" component="p" fontFamily="monospace" fontWeight="semibold">
            {quote ? quote.price.toFixed(2) : 'Loading...'}
          </Typography>
          <Typography variant="body2" color={textColor} fontWeight="medium">
            {quote ? `${quote.change >= 0 ? '+' : ''}${quote.change.toFixed(4)}` : '...'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SymbolCard;
