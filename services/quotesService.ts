
import { Quote } from '../types';

type QuoteListener = (quote: Quote) => void;

class QuotesService {
  private listeners: Map<string, QuoteListener[]> = new Map();
  private intervalId: number | null = null;
  private subscribedSymbols: Set<string> = new Set();
  private symbolPrices: Map<string, number> = new Map();

  constructor() {
    this.start();
  }

  private start() {
    if (this.intervalId) return;
    this.intervalId = window.setInterval(() => {
      this.subscribedSymbols.forEach(symbol => {
        const currentPrice = this.symbolPrices.get(symbol) || (Math.random() * 50000 + 1000);
        const change = (Math.random() - 0.5) * (currentPrice * 0.01);
        const newPrice = Math.max(0, currentPrice + change);
        this.symbolPrices.set(symbol, newPrice);

        const quote: Quote = { symbol, price: newPrice, change };
        this.emit(symbol, quote);
      });
    }, 1500);
  }

  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  
  public subscribe(symbols: string[], listener: QuoteListener) {
    symbols.forEach(symbol => {
      this.subscribedSymbols.add(symbol);
      const symbolListeners = this.listeners.get(symbol) || [];
      if (!symbolListeners.includes(listener)) {
        this.listeners.set(symbol, [...symbolListeners, listener]);
      }
    });
  }

  public unsubscribe(symbols: string[], listener: QuoteListener) {
    symbols.forEach(symbol => {
        const symbolListeners = this.listeners.get(symbol) || [];
        this.listeners.set(symbol, symbolListeners.filter(l => l !== listener));
        if (this.listeners.get(symbol)?.length === 0) {
            this.subscribedSymbols.delete(symbol);
        }
    });
  }

  private emit(symbol: string, quote: Quote) {
    const symbolListeners = this.listeners.get(symbol) || [];
    symbolListeners.forEach(listener => listener(quote));
  }
}

export const quotesService = new QuotesService();
