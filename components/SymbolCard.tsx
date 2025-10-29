
import React, { useState, useEffect, useRef } from 'react';
import { Quote } from '../types';

interface SymbolCardProps {
  symbol: string;
  initialQuote: Quote | null;
}

const SymbolCard: React.FC<SymbolCardProps> = ({ symbol, initialQuote }) => {
  const [quote, setQuote] = useState<Quote | null>(initialQuote);
  const [flash, setFlash] = useState<'green' | 'red' | ''>('');
  const prevPrice = useRef<number | undefined>(initialQuote?.price);

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

  const flashClass =
    flash === 'green' ? 'bg-green-trade/20' : flash === 'red' ? 'bg-red-trade/20' : '';

  const textColor = quote && quote.change >= 0 ? 'text-green-trade' : 'text-red-trade';

  return (
    <div className={`p-4 rounded-lg bg-white dark:bg-dark-surface shadow-md transition-all duration-300 ${flashClass}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800 dark:text-dark-text">{symbol}</h3>
        <button className="text-sm text-primary dark:text-indigo-400 hover:underline">
          Info
        </button>
      </div>
      <div className="mt-2 text-right">
        <p className="text-2xl font-mono font-semibold text-gray-900 dark:text-white">
          {quote ? quote.price.toFixed(2) : 'Loading...'}
        </p>
        <p className={`text-sm font-medium ${textColor}`}>
          {quote ? `${quote.change >= 0 ? '+' : ''}${quote.change.toFixed(4)}` : '...'}
        </p>
      </div>
    </div>
  );
};

export default SymbolCard;
