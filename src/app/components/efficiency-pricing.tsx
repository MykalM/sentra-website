import { useState, useEffect } from "react";

interface EfficiencyPricingProps {
  itemName: string;
  basePrice: number;        // Price when making just 1
  currentVolume: number;    // How many ordered in last hour  
  efficiencyThreshold: number; // Volume needed for max efficiency
  maxDiscount: number;      // Max discount from efficiency
  lockFee: number;
  onLockIn: () => void;
  isLocking: boolean;
}

export function EfficiencyPricing({
  itemName,
  basePrice,
  currentVolume,
  efficiencyThreshold,
  maxDiscount,
  lockFee,
  onLockIn,
  isLocking
}: EfficiencyPricingProps) {
  // Calculate efficiency discount based on volume
  const efficiencyRatio = Math.min(currentVolume / efficiencyThreshold, 1);
  const efficiencyDiscount = efficiencyRatio * maxDiscount;
  const currentPrice = basePrice - efficiencyDiscount;
  const finalPrice = currentPrice - lockFee;
  
  // Calculate potential next-hour pricing
  const projectedVolume = currentVolume + Math.floor(currentVolume * 0.3); // 30% growth
  const projectedRatio = Math.min(projectedVolume / efficiencyThreshold, 1);
  const projectedDiscount = projectedRatio * maxDiscount;
  const projectedPrice = basePrice - projectedDiscount;

  const getVolumeStatus = () => {
    if (efficiencyRatio < 0.3) return { level: "Low Volume", color: "text-orange-600 bg-orange-100" };
    if (efficiencyRatio < 0.7) return { level: "Building", color: "text-blue-600 bg-blue-100" };
    return { level: "Peak Efficiency", color: "text-green-600 bg-green-100" };
  };

  const volumeStatus = getVolumeStatus();

  return (
    <div className="space-y-4">
      
      {/* Efficiency Header */}
      <div className="text-center bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
          More Orders = Lower Prices
        </h3>
        <p className="text-sm text-blue-600 dark:text-blue-400">
          When {itemName} is popular, we can make it more efficiently and pass savings to you
        </p>
      </div>

      {/* Current Efficiency Status */}
      <div className="bg-card border-2 border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-foreground">Current Efficiency</h4>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${volumeStatus.color}`}>
            {volumeStatus.level}
          </span>
        </div>

        {/* Efficiency Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Volume this hour</span>
            <span>{currentVolume} orders</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-orange-500 via-blue-500 to-green-500 transition-all"
              style={{ width: `${Math.min(efficiencyRatio * 100, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Single orders</span>
            <span>Peak efficiency ({efficiencyThreshold}+ orders)</span>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Base price (single order)</span>
            <span className="text-lg font-medium text-muted-foreground">${basePrice}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-green-600">Efficiency discount</span>
            <span className="text-lg font-bold text-green-600">-${efficiencyDiscount.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center border-t border-border pt-2">
            <span className="font-medium text-foreground">Current price</span>
            <span className="text-xl font-bold text-foreground">${currentPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-primary">Lock fee (becomes credit)</span>
            <span className="text-lg font-bold text-primary">-${lockFee}</span>
          </div>
          
          <div className="flex justify-between items-center border-t border-border pt-2">
            <span className="text-lg font-bold text-foreground">You pay</span>
            <span className="text-2xl font-bold text-foreground">${finalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Efficiency Insight */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4">
          <div className="text-sm text-green-700 dark:text-green-300">
            <span className="font-medium">Why it's cheaper: </span>
            When we make {currentVolume} {itemName}s in an hour, we can batch ingredients, 
            optimize workflow, and reduce per-unit costs. You benefit from the efficiency!
          </div>
        </div>

        {/* Trending Alert */}
        {projectedPrice < currentPrice && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Trending: </span>
              <span className="text-sm">
                If popularity continues, price could drop to ${projectedPrice.toFixed(2)} next hour
              </span>
            </div>
          </div>
        )}

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
              Locking in efficiency price...
            </>
          ) : (
            `Lock ${itemName} at efficiency price • $${lockFee}`
          )}
        </button>
        
        <p className="text-center text-xs text-muted-foreground mt-2">
          Final price: ${finalPrice.toFixed(2)} • Efficiency discount: ${efficiencyDiscount.toFixed(2)}
        </p>
      </div>

      {/* How Efficiency Works */}
      <div className="bg-background border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">How efficiency pricing works:</h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <span className="text-primary font-bold">1.</span>
            <span>More people order the same item in an hour</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary font-bold">2.</span>
            <span>We can batch prepare, reducing cost per unit</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary font-bold">3.</span>
            <span>Savings automatically passed to you</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary font-bold">4.</span>
            <span>Popular items become the best deals</span>
          </div>
        </div>
      </div>
    </div>
  );
}