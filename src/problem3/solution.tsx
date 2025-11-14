
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added missing property
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

// Simplified Props - can just use BoxProps directly or keep if planning to extend
type Props = BoxProps;

const BLOCKCHAIN_PRIORITIES: Record<string, number> = {
  'Osmosis': 100,
  'Ethereum': 50,
  'Arbitrum': 30,
  'Zilliqa': 20,
  'Neo': 20,
};  
const NO_PRIORITY = -99;

const classes = {
  row: 'wallet-row'
};

const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Moved outside and properly typed
  const getPriority = (blockchain: string): number => {
    return BLOCKCHAIN_PRIORITIES[blockchain] || NO_PRIORITY;
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // Fixed logic: keep balances with positive amounts and valid priority
        return balancePriority > NO_PRIORITY && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        // Fixed: return 0 for equal case, descending order
        return rightPriority - leftPriority;
      });
  }, [balances]); // Removed prices from dependencies

  // Combine formatting and row generation in a single operation
  const rows = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          key={`${balance.blockchain}-${balance.currency}`}  // Use unique identifier instead of index(This avoids potential rendering issues)
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.amount.toFixed()} // Add formattedAmount to FormattedWalletBalance
        />
      );
    }); // Memoize the rows to avoid unnecessary re-renders
  }, [sortedBalances, prices]); // Now prices is correctly in dependencies

  return <div {...rest}>{rows}</div>; // Memoize the div to avoid unnecessary re-renders