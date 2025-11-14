# 1. Property in Interface not well defined
- balance.blockchain is accessed, but the WalletBalance interface doesn't have a blockchain property.
- FormattedWalletBalance can be used for extends
- Simplified Props - can just use BoxProps directly or keep if planning to extend

```tsx
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
```

# 2. getPriority
- Redefined every render → Moved outside and properly typed(avoid using 'any')
- `-99` assign to a constant 

```tsx
const BLOCKCHAIN_PRIORITIES: Record<string, number> = {
  'Osmosis': 100,
  'Ethereum': 50,
  'Arbitrum': 30,
  'Zilliqa': 20,
  'Neo': 20,
};  
const NO_PRIORITY = -99;

// Moved outside and properly typed
const getPriority = (blockchain: string): number => {
  return BLOCKCHAIN_PRIORITIES[blockchain] || NO_PRIORITY;
};
```

# 3. sortedBalances & formattedBalances
- lhsPriority is referenced but never defined. It should be balancePriority(can cause runtime error)
- The filter keeps balances with amount <= 0 and priority > -99, which is backwards
- The return statements are inverted
- nested if statements inside `filter()` can be simplified into an one-liner expression
- The sort function doesn't return a value when priorities are equal(Should return 0 for the equal case)
- `formattedBalances` is unused and can be chained after `.map`
- prices is in the dependency array but not used in the useMemo (This causes unnecessary recalculations when prices change)

```tsx
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
```

# 4. WalletRows
- Maps over sortedBalances (type WalletBalance[]) but types the parameter as FormattedWalletBalance
- Using array index as React key is an anti-pattern(Should use a unique identifier like currency or a combination of properties)
- classes is not defined anywhere in the component.


```tsx
  const classes = {
    row: 'wallet-row'
  };

  const rows = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          key={`${balance.blockchain}-${balance.currency}`}  // Use unique identifier instead of index
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.amount.toFixed()}
        />
      );
    });
  }, [sortedBalances, prices]); // Now prices is correctly in dependencies
```