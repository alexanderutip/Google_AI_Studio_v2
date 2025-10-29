import React, { createContext, useReducer, useEffect, ReactNode, useContext, useCallback } from 'react';
import { AppState, AppAction, AppContextType, Theme } from '../types';
import { LOCAL_STORAGE_KEYS, DEFAULT_SUBSCRIBED_SYMBOLS } from '../constants';

const getInitialTheme = (): Theme => {
  const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME) as Theme;
  if (storedTheme) {
    return storedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const initialState: AppState = {
  isAuthenticated: !!localStorage.getItem(LOCAL_STORAGE_KEYS.ACS_TOKEN),
  acsToken: localStorage.getItem(LOCAL_STORAGE_KEYS.ACS_TOKEN),
  tradeServerToken: localStorage.getItem(LOCAL_STORAGE_KEYS.TRADE_SERVER_TOKEN),
  theme: getInitialTheme(),
  subscribedSymbols: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.SUBSCRIBED_SYMBOLS) || JSON.stringify(DEFAULT_SUBSCRIBED_SYMBOLS)),
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, ...action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, acsToken: null, tradeServerToken: null };
    case 'TOGGLE_THEME':
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, newTheme);
      return { ...state, theme: newTheme };
    case 'ADD_SYMBOL':
      if (state.subscribedSymbols.includes(action.payload)) return state;
      return { ...state, subscribedSymbols: [...state.subscribedSymbols, action.payload] };
    case 'REMOVE_SYMBOL':
      return { ...state, subscribedSymbols: state.subscribedSymbols.filter(s => s !== action.payload) };
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SUBSCRIBED_SYMBOLS, JSON.stringify(state.subscribedSymbols));
  }, [state.subscribedSymbols]);

  const login = useCallback((acsToken: string, tradeServerToken: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACS_TOKEN, acsToken);
    localStorage.setItem(LOCAL_STORAGE_KEYS.TRADE_SERVER_TOKEN, tradeServerToken);
    dispatch({ type: 'LOGIN', payload: { acsToken, tradeServerToken } });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TRADE_SERVER_TOKEN);
    dispatch({ type: 'LOGOUT' });
  }, []);

  const toggleTheme = useCallback(() => dispatch({ type: 'TOGGLE_THEME' }), []);
  const addSymbol = useCallback((symbol: string) => dispatch({ type: 'ADD_SYMBOL', payload: symbol }), []);
  const removeSymbol = useCallback((symbol: string) => dispatch({ type: 'REMOVE_SYMBOL', payload: symbol }), []);

  return (
    <AppContext.Provider value={{ ...state, login, logout, toggleTheme, addSymbol, removeSymbol }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};
