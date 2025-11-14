import { useState, useRef, useEffect } from 'react';
import { Token } from '../types';
import './TokenSelector.css';

interface TokenSelectorProps {
  selectedToken: Token | null;
  tokens: Token[];
  onSelectToken: (token: Token) => void;
  excludeToken?: Token | null;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  tokens,
  onSelectToken,
  excludeToken,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTokens = tokens.filter(
    (token) =>
      token.currency !== excludeToken?.currency &&
      token.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectToken = (token: Token) => {
    onSelectToken(token);
    setIsOpen(false);
    setSearchQuery('');
  };

  const getTokenIconUrl = (currency: string) => {
    return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`;
  };

  return (
    <div className="token-selector" ref={dropdownRef}>
      <button
        type="button"
        className="token-select-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedToken ? (
          <>
            <img
              src={getTokenIconUrl(selectedToken.currency)}
              alt={selectedToken.currency}
              className="token-icon"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="token-symbol">{selectedToken.currency}</span>
          </>
        ) : (
          <span className="token-symbol">Select token</span>
        )}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="token-dropdown">
          <div className="search-container">
            <input
              type="text"
              className="token-search"
              placeholder="Search token..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          <div className="token-list">
            {filteredTokens.length > 0 ? (
              filteredTokens.map((token) => (
                <button
                  key={token.currency}
                  type="button"
                  className={`token-item ${
                    selectedToken?.currency === token.currency ? 'selected' : ''
                  }`}
                  onClick={() => handleSelectToken(token)}
                >
                  <div className="token-info">
                    <img
                      src={getTokenIconUrl(token.currency)}
                      alt={token.currency}
                      className="token-icon"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span className="token-name">{token.currency}</span>
                  </div>
                  <span className="token-price">${token.price.toFixed(4)}</span>
                </button>
              ))
            ) : (
              <div className="no-results">No tokens found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenSelector;

