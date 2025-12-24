interface CommitmentDiscountPricingProps {
  itemName: string;
  regularPrice: number; // What walk-in guests pay
  lockInPrice: number;  // Discounted price for planners
  lockFee: number;      // Fee that becomes credit
  discountPercentage: number;
  lockedCount: number;
  onLockIn: () => void;
  isLocking: boolean;
}

export function CommitmentDiscountPricing({
  itemName,
  regularPrice,
  lockInPrice,
  lockFee,
  discountPercentage,
  lockedCount,
  onLockIn,
  isLocking
}: CommitmentDiscountPricingProps) {
  const finalPrice = lockInPrice - lockFee;
  const totalSavings = regularPrice - finalPrice;

  return (
    <div className="space-y-4">
      
      {/* Value Proposition Header */}
      <div className="text-center bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">
          Lock in. Save money. Skip the wait.
        </h3>
        <p className="text-sm text-green-600 dark:text-green-400">
          Plan ahead and get rewarded with {discountPercentage}% off + ready on arrival
        </p>
      </div>

      {/* Pricing Breakdown */}
      <div className="bg-card border-2 border-border rounded-xl p-6">
        <h4 className="font-semibold text-foreground mb-4">Your Commitment Discount</h4>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center pb-2">
            <span className="text-muted-foreground">Walk-in price (what others pay)</span>
            <span className="text-lg font-medium text-muted-foreground line-through">${regularPrice}</span>
          </div>
          
          <div className="flex justify-between items-center pb-2">
            <span className="text-foreground font-medium">Lock-in price (planning discount)</span>
            <span className="text-lg font-bold text-foreground">${lockInPrice}</span>
          </div>
          
          <div className="flex justify-between items-center pb-2 border-b border-border">
            <span className="text-primary">Lock fee (becomes credit)</span>
            <span className="text-lg font-bold text-primary">-${lockFee}</span>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-bold text-foreground">You pay</span>
            <span className="text-2xl font-bold text-foreground">${finalPrice}</span>
          </div>
        </div>

        {/* Savings Highlight */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4 text-center">
          <div className="text-lg font-bold text-green-700 dark:text-green-300">
            You save ${totalSavings.toFixed(2)} vs walk-in guests
          </div>
          <div className="text-sm text-green-600 dark:text-green-400">
            That's {Math.round((totalSavings / regularPrice) * 100)}% off for planning ahead
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-2 mb-4 text-sm text-muted-foreground">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{lockedCount} smart planners locked in today</span>
        </div>

        {/* Lock In Button */}
        <button
          onClick={onLockIn}
          disabled={isLocking}
          className="w-full bg-primary text-primary-foreground h-12 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-base"
        >
          {isLocking ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Locking in your discount...
            </>
          ) : (
            `Lock in ${itemName} • Save ${totalSavings.toFixed(2)} • Pay $${lockFee}`
          )}
        </button>
        
        <p className="text-center text-xs text-muted-foreground mt-2">
          Your ${lockFee} becomes credit • Final price: ${finalPrice}
        </p>
      </div>

      {/* How It Works */}
      <div className="bg-background border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">How commitment discounts work:</h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <span className="text-primary font-bold">1.</span>
            <span>Lock in your discount now with a small deposit</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary font-bold">2.</span>
            <span>We'll prep your order based on your location</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary font-bold">3.</span>
            <span>Arrive to ready food, pay discounted price</span>
          </div>
        </div>
      </div>
    </div>
  );
}