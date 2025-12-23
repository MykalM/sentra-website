interface LockInPricingProps {
  currentPrice: number;
  reservationFee: number;
  peakPriceToday: number;
  hourlyReservations: number;
  locksLeftAtPrice: number;
  itemName: string;
  onLockIn: () => void;
  isLocking: boolean;
}

export function LockInPricing({
  currentPrice,
  reservationFee,
  peakPriceToday,
  hourlyReservations,
  locksLeftAtPrice,
  itemName,
  onLockIn,
  isLocking
}: LockInPricingProps) {
  const finalPrice = currentPrice - reservationFee;
  const potentialSavings = peakPriceToday - currentPrice;
  const savingsPercentage = Math.round((potentialSavings / peakPriceToday) * 100);

  return (
    <div className="space-y-4">
      
      {/* Social Proof */}
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">
            ● {hourlyReservations} people locked in the last hour
          </span>
          <span className="text-orange-600 font-medium">
            ● {locksLeftAtPrice} locks left at this price
          </span>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Price could reach ${peakPriceToday} during peak dinner rush
        </div>
      </div>

      {/* Lock In Breakdown */}
      <div className="bg-card border-2 border-primary/20 rounded-lg p-4">
        <h4 className="font-semibold text-foreground mb-3">If you lock in now:</h4>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">You pay</span>
            <span className="font-medium text-foreground">${currentPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Your lock fee</span>
            <span className="font-medium text-foreground">-${reservationFee} (becomes credit)</span>
          </div>
          <div className="border-t border-border pt-2 mt-2 flex justify-between">
            <span className="font-medium text-foreground">Final price</span>
            <span className="font-bold text-foreground">${finalPrice}</span>
          </div>
        </div>
        
        {potentialSavings > 0 && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-center">
              <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                Peak price today could reach ${peakPriceToday}
              </p>
              <p className="text-lg font-bold text-green-700 dark:text-green-300">
                Potential savings: ${potentialSavings} ({savingsPercentage}% off)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Lock In Button */}
      <button
        onClick={onLockIn}
        disabled={isLocking || locksLeftAtPrice === 0}
        className="w-full bg-primary text-primary-foreground h-12 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
      >
        {isLocking ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Locking in...
          </>
        ) : locksLeftAtPrice === 0 ? (
          "Price lock sold out"
        ) : (
          `Lock in ${itemName} — $${reservationFee}`
        )}
      </button>
      
      {locksLeftAtPrice > 0 && locksLeftAtPrice <= 5 && (
        <p className="text-center text-xs text-orange-600 font-medium">
          Only {locksLeftAtPrice} price locks left!
        </p>
      )}
    </div>
  );
}