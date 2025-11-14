import { useState, useEffect } from 'react';
import SwapForm from './components/SwapForm';
import { Token, TokenPrice } from './types';
import './App.css';

function App() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://interview.switcheo.com/prices.json');
        if (!response.ok) {
          throw new Error('Failed to fetch prices');
        }
        const data: TokenPrice[] = await response.json();
        
        // Get the latest price for each currency
        const currencyMap = new Map<string, number>();
        data.forEach((item) => {
          const existing = currencyMap.get(item.currency);
          if (!existing || item.price > 0) {
            currencyMap.set(item.currency, item.price);
          }
        });

        // Filter out tokens with no price and create token objects
        const tokenList: Token[] = Array.from(currencyMap.entries())
          .filter(([, price]) => price > 0)
          .map(([currency, price]) => ({ currency, price }))
          .sort((a, b) => a.currency.localeCompare(b.currency));

        setTokens(tokenList);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tokens');
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading tokens...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <p>❌ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="background-gradient"></div>
      <SwapForm tokens={tokens} />
    </div>
  );
}

export default App;

