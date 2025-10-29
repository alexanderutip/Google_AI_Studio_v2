
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppContextProvider, useAppContext } from './contexts/AppContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Layout from './components/Layout';

const SettingsPage = lazy(() => import('./pages/SettingsPage'));

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAppContext();

  return (
    <HashRouter>
      <Suspense fallback={<div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-dark-bg text-dark-text">Loading...</div>}>
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
    </HashRouter>
  );
};

export default App;
