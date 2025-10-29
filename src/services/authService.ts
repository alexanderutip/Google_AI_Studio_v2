export const loginWithEmail = (email: string, password: string): Promise<{ acsToken: string; tradeServerToken: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password') {
        // Simulate generating tokens
        const acsToken = `acs_token_${Date.now()}_${Math.random()}`;
        const tradeServerToken = `trade_token_${Date.now()}_${Math.random()}`;
        resolve({ acsToken, tradeServerToken });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
};
