import { useState, useEffect } from 'react';
import { Token } from '../types';
import TokenSelector from './TokenSelector';
import './SwapForm.css';

interface SwapFormProps {
  tokens: Token[];
}

const SwapForm: React.FC<SwapFormProps> = ({ tokens }) => {
  const [fromToken, setFromToken] = useState<Token | null>(tokens[0] || null);
  const [toToken, setToToken] = useState<Token | null>(tokens[1] || null);
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Calculate exchange rate
  useEffect(() => {
    if (fromAmount && fromToken && toToken) {
      const amount = parseFloat(fromAmount);
      if (!isNaN(amount) && amount > 0) {
        const exchangeRate = fromToken.price / toToken.price;
        const result = amount * exchangeRate;
        setToAmount(result.toFixed(6));
        setError('');
      }
    } else if (!fromAmount) {
      setToAmount('');
    }
  }, [fromAmount, fromToken, toToken]);

  const handleFromAmountChange = (value: string) => {
    // Allow only numbers and decimals
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFromAmount(value);
      setError('');
      setIsSuccess(false);
    }
  };

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromToken || !toToken) {
      setError('Please select both tokens');
      return;
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    // Simulate successful swap
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFromAmount('');
      setToAmount('');
    }, 3000);
  };

  const getExchangeRate = () => {
    if (fromToken && toToken) {
      const rate = fromToken.price / toToken.price;
      return `1 ${fromToken.currency} ≈ ${rate.toFixed(6)} ${toToken.currency}`;
    }
    return '';
  };

  return (
    <div className="swap-container">
      <div className="swap-card">
        <div className="swap-header">
          <h1>Swap</h1>
          <p className="subtitle">Trade tokens in an instant</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="swap-section">
            <label className="section-label">You pay</label>
            <div className="input-group">
              <input
                type="text"
                className="amount-input"
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
              />
              <TokenSelector
                selectedToken={fromToken}
                tokens={tokens}
                onSelectToken={setFromToken}
                excludeToken={toToken}
              />
            </div>
            {fromToken && fromAmount && (
              <div className="usd-value">
                ≈ ${(parseFloat(fromAmount) * fromToken.price).toFixed(2)} USD
              </div>
            )}
          </div>

          <div className="swap-arrow-container">
            <button
              type="button"
              className="swap-arrow-button"
              onClick={handleSwapTokens}
              aria-label="Swap tokens"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="swap-section">
            <label className="section-label">You receive</label>
            <div className="input-group">
              <input
                type="text"
                className="amount-input"
                placeholder="0.0"
                value={toAmount}
                readOnly
              />
              <TokenSelector
                selectedToken={toToken}
                tokens={tokens}
                onSelectToken={setToToken}
                excludeToken={fromToken}
              />
            </div>
            {toToken && toAmount && (
              <div className="usd-value">
                ≈ ${(parseFloat(toAmount) * toToken.price).toFixed(2)} USD
              </div>
            )}
          </div>

          {fromToken && toToken && fromAmount && (
            <div className="exchange-rate">
              <span className="rate-label">Rate:</span>
              <span className="rate-value">{getExchangeRate()}</span>
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {isSuccess && (
            <div className="success-message">
              ✓ Swap successful!
            </div>
          )}

          <button
            type="submit"
            className="swap-button"
            disabled={!fromAmount || !fromToken || !toToken || !!error}
          >
            {isSuccess ? 'Swap Successful!' : 'Confirm Swap'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SwapForm;

