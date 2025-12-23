import { useState, useEffect } from "react";

interface CoffeeConfirmationProps {
  item: {
    name: string;
    currentPrice: number;
    reservationFee: number;
  };
  mode: 'skip-line' | 'lock-price';
  pickupTime?: string;
  code: string;
  venueName: string;
}

export function CoffeeConfirmation({ item, mode, pickupTime, code, venueName }: CoffeeConfirmationProps) {
  const [currentRushPrice, setCurrentRushPrice] = useState(6.80);
  
  // Simulate price climbing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRushPrice(prev => Math.min(7.50, prev + 0.05));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const finalPrice = item.currentPrice - item.reservationFee;
  const currentSavings = currentRushPrice - item.currentPrice;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="text-center px-6 py-8 bg-card border-b border-border">
        <h1 className="text-2xl font-semibold text-foreground mb-1">
          {venueName}
        </h1>
        <p className="text-sm text-muted-foreground">
          Alberta Arts District, Portland
        </p>
      </header>

      <main className="max-w-md mx-auto p-6">
        
        {/* Success State */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">☕</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Locked.
          </h2>
          {mode === 'skip-line' && pickupTime && (
            <p className="text-lg text-muted-foreground">
              Your coffee will be ready at {pickupTime}.
            </p>
          )}
          {mode === 'lock-price' && (
            <p className="text-lg text-muted-foreground">
              Your price is locked. Order when you arrive.
            </p>
          )}
        </div>

        {/* Order Details */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4">{item.name}</h3>
          
          {/* Price Comparison */}
          <div className="bg-background border border-border rounded-lg p-3 mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Your price</span>
              <span className="font-medium text-foreground">${item.currentPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Rush price</span>
              <span className="font-medium text-orange-600">${currentRushPrice.toFixed(2)} (and climbing)</span>
            </div>
          </div>

          {/* Reservation Code */}
          <div className="text-center py-6 border-t border-border">
            <div className="text-sm text-muted-foreground mb-2">YOUR CODE</div>
            <div className="text-3xl font-mono font-bold text-primary tracking-wider mb-2">
              {code}
            </div>
            <div className="text-sm text-muted-foreground">
              {mode === 'skip-line' ? 'Show this at the pickup counter' : 'Show this when you order'}
            </div>
          </div>
        </div>

        {/* Savings Indicator */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6 text-center">
          <div className="text-green-700 dark:text-green-300 font-medium mb-1">
            Nice timing 👍
          </div>
          <div className="text-lg font-bold text-green-700 dark:text-green-300">
            Saving ${currentSavings.toFixed(2)} vs current rush price
          </div>
          <div className="text-xs text-green-600 dark:text-green-400 mt-1">
            You beat {Math.round((currentSavings / currentRushPrice) * 100)}% of guests paying full price
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h4 className="font-semibold text-foreground mb-4">What's next?</h4>
          <div className="space-y-3 text-sm">
            {mode === 'skip-line' ? (
              <>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs font-semibold">1</span>
                  </div>
                  <p className="text-muted-foreground">
                    Get a push notification when your coffee is ready
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs font-semibold">2</span>
                  </div>
                  <p className="text-muted-foreground">
                    Go directly to the pickup counter (skip the line)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs font-semibold">3</span>
                  </div>
                  <p className="text-muted-foreground">
                    Show code <strong>{code}</strong> and pay ${finalPrice.toFixed(2)}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs font-semibold">1</span>
                  </div>
                  <p className="text-muted-foreground">
                    Head to {venueName} and get in line normally
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs font-semibold">2</span>
                  </div>
                  <p className="text-muted-foreground">
                    Order your {item.name} and show code <strong>{code}</strong>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs font-semibold">3</span>
                  </div>
                  <p className="text-muted-foreground">
                    Pay ${finalPrice.toFixed(2)} regardless of current price
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(venueName + ' Portland')}`}
            className="w-full bg-primary text-primary-foreground h-12 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get directions to {venueName}
          </a>
          
          <button
            onClick={() => window.history.back()}
            className="w-full border border-border text-foreground h-12 rounded-lg font-medium hover:bg-muted transition-colors"
          >
            Back to menu
          </button>
        </div>

        {/* Lock Duration */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Price lock valid for 2 hours • Questions? Ask your barista about Sentra
          </p>
        </div>
      </main>
    </div>
  );
}