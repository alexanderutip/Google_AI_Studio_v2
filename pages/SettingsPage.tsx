
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { AVAILABLE_SYMBOLS } from '../constants';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme, logout, subscribedSymbols, addSymbol, removeSymbol } = useAppContext();
  
  const unsubscribedSymbols = AVAILABLE_SYMBOLS.filter(s => !subscribedSymbols.includes(s));

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Theme Settings */}
      <div className="p-6 bg-white dark:bg-dark-surface rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Appearance</h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-dark-text-secondary">Theme</span>
          <button
            onClick={toggleTheme}
            className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors bg-gray-200 dark:bg-gray-700"
          >
            <span
              className={`${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </button>
        </div>
      </div>
      
      {/* Symbol Subscriptions */}
      <div className="p-6 bg-white dark:bg-dark-surface rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Manage Symbols</h2>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-dark-text">Subscribed</h3>
          <div className="flex flex-wrap gap-2">
            {subscribedSymbols.length > 0 ? subscribedSymbols.map(s => (
              <div key={s} className="flex items-center bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 text-sm font-medium px-2.5 py-1 rounded-full">
                <span>{s}</span>
                <button onClick={() => removeSymbol(s)} className="ml-2 -mr-1 p-0.5 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </button>
              </div>
            )) : <p className="text-sm text-gray-500 dark:text-dark-text-secondary">No symbols subscribed.</p>}
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-dark-text">Available</h3>
          <div className="flex flex-wrap gap-2">
            {unsubscribedSymbols.map(s => (
              <div key={s} className="flex items-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm font-medium px-2.5 py-1 rounded-full">
                <span>{s}</span>
                <button onClick={() => addSymbol(s)} className="ml-2 -mr-1 p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Account */}
      <div className="p-6 bg-white dark:bg-dark-surface rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Account</h2>
        <button
          onClick={logout}
          className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
