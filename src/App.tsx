import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppContextProvider, useAppContext } from './contexts/AppContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Layout from './components/Layout';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { StyledEngineProvider } from '@mui/material/styles';

const SettingsPage = lazy(() => import('./pages/SettingsPage'));

const App: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <AppContextProvider>
        <AppWithTheme />
      </AppContextProvider>
    </StyledEngineProvider>
  );
};

const AppWithTheme: React.FC = () => {
  const { theme } = useAppContext();
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <AppContent />
    </ThemeProvider>
  );
}

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAppContext();

  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>Loading...</div>}>
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <Route path="/" element={<Layout />}>
              <Route index element={<DashboardPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
