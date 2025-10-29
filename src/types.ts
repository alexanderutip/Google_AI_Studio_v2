export type Theme = 'light' | 'dark';

export interface Quote {
  symbol: string;
  price: number;
  change: number;
}

export interface AppState {
  isAuthenticated: boolean;
  acsToken: string | null;
  tradeServerToken: string | null;
  theme: Theme;
  subscribedSymbols: string[];
}

export type AppAction =
  | { type: 'LOGIN'; payload: { acsToken: string; tradeServerToken: string } }
  | { type: 'LOGOUT' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'ADD_SYMBOL'; payload: string }
  | { type: 'REMOVE_SYMBOL'; payload: string };

export interface AppContextType extends AppState {
  login: (acsToken: string, tradeServerToken: string) => void;
  logout: () => void;
  toggleTheme: () => void;
  addSymbol: (symbol: string) => void;
  removeSymbol: (symbol: string) => void;
}
