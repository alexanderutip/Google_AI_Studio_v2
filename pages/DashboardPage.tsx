
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { quotesService } from '../services/quotesService';
import { Quote } from '../types';
import SymbolCard from '../components/SymbolCard';

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
        <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No Symbols Subscribed</h2>
            <p className="text-gray-600 dark:text-dark-text-secondary">Go to settings to add symbols to your dashboard.</p>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {subscribedSymbols.map(symbol => (
        <SymbolCard key={symbol} symbol={symbol} initialQuote={quotes[symbol] || null} />
      ))}
    </div>
  );
};

export default DashboardPage;
