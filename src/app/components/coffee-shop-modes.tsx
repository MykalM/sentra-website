import { useState } from "react";

interface CoffeeShopModesProps {
  item: {
    name: string;
    currentPrice: number;
    reservationFee: number;
    peakPriceToday: number;
    priceChange: number;
  };
  onSkipLine: (pickupTime: string) => void;
  onLockPrice: () => void;
  isProcessing: boolean;
}

export function CoffeeShopModes({ item, onSkipLine, onLockPrice, isProcessing }: CoffeeShopModesProps) {
  const [mode, setMode] = useState<'select' | 'skip-line' | 'lock-price'>('select');
  const [selectedPickupTime, setSelectedPickupTime] = useState('');

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  
  // Generate pickup times (15-min intervals for next 2 hours)
  const pickupTimes = [];
  for (let i = 0; i < 8; i++) {
    const time = new Date(currentTime.getTime() + (15 * (i + 1)) * 60 * 1000);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const timeString = `${hour}:${minute.toString().padStart(2, '0')}`;
    pickupTimes.push(timeString);
  }

  const rushPrice = 6.80;
  const currentSavings = rushPrice - item.currentPrice;
  const potentialSavings = item.peakPriceToday - item.currentPrice;
  const finalPrice = item.currentPrice - item.reservationFee;

  if (mode === 'select') {
    return (
      <div className="space-y-6">
        {/* Urgency Banner */}
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-orange-600 font-medium">⚠️ Rush hour pricing starts soon</span>
          </div>
          <div className="text-sm text-orange-700 dark:text-orange-300">
            Price could reach ${item.peakPriceToday} by 9:30am. Lock it now while it's ${item.currentPrice}.
          </div>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">How do you want your coffee?</h3>
          <p className="text-sm text-muted-foreground">Choose your approach before heading over</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Skip the Line */}
          <button
            onClick={() => setMode('skip-line')}
            className="p-6 border-2 border-border rounded-xl hover:border-primary hover:bg-card/50 transition-all text-left group"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Skip the Line</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Ready when you arrive
              </p>
              <div className="text-xs text-green-600 font-medium">
                + Lock price + Skip wait
              </div>
            </div>
          </button>

          {/* Just Lock Price */}
          <button
            onClick={() => setMode('lock-price')}
            className="p-6 border-2 border-border rounded-xl hover:border-primary hover:bg-card/50 transition-all text-left group"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Just Lock Price</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Order when you arrive
              </p>
              <div className="text-xs text-primary font-medium">
                Lock ${item.currentPrice} before it jumps
              </div>
            </div>
          </button>
        </div>

        {/* Current Savings Preview */}
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-sm text-muted-foreground mb-1">If you lock now vs rush price:</div>
          <div className="text-xl font-bold text-green-600">
            Save ${currentSavings.toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground">
            Potential savings: ${potentialSavings.toFixed(2)} vs peak
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'skip-line') {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setMode('select')}
          className="flex items-center gap-2 text-primary text-sm hover:underline"
        >
          ← Back to options
        </button>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Skip the Line</h3>
          <p className="text-sm text-muted-foreground mb-6">
            When do you want your {item.name} ready?
          </p>

          <div className="grid grid-cols-4 gap-2 mb-6">
            {pickupTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedPickupTime(time)}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  selectedPickupTime === time
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-foreground hover:bg-muted'
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          {selectedPickupTime && (
            <>
              <div className="bg-background border border-border rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-foreground">Price Breakdown</span>
                  <span className="text-xs text-muted-foreground">Ready at {selectedPickupTime}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price locked</span>
                    <span className="font-medium text-foreground">${item.currentPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lock fee (becomes credit)</span>
                    <span className="font-medium text-foreground">-${item.reservationFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="font-medium text-foreground">You'll pay at pickup</span>
                    <span className="font-bold text-foreground">${finalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current rush price</span>
                    <span className="text-muted-foreground">${rushPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-green-600">
                    <span>You save</span>
                    <span>${(rushPrice - finalPrice).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSkipLine(selectedPickupTime)}
                disabled={isProcessing}
                className="w-full bg-primary text-primary-foreground h-12 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Locking in...
                  </>
                ) : (
                  `Lock in • Ready at ${selectedPickupTime} • $${item.reservationFee}`
                )}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  if (mode === 'lock-price') {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setMode('select')}
          className="flex items-center gap-2 text-primary text-sm hover:underline"
        >
          ← Back to options
        </button>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Just Lock the Price</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Lock in ${item.currentPrice} now. Order when you arrive and get in line normally.
          </p>

          <div className="bg-background border border-border rounded-lg p-4 mb-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Your locked price</span>
                <span className="font-medium text-foreground">${item.currentPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lock fee (becomes discount)</span>
                <span className="font-medium text-foreground">${item.reservationFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="font-medium text-foreground">Final price</span>
                <span className="font-bold text-foreground">${finalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border text-center">
              <div className="text-xs text-muted-foreground mb-1">If price rises to ${item.peakPriceToday}</div>
              <div className="text-lg font-bold text-green-600">
                You save ${(item.peakPriceToday - finalPrice).toFixed(2)}
              </div>
            </div>
          </div>

          <button
            onClick={onLockPrice}
            disabled={isProcessing}
            className="w-full bg-primary text-primary-foreground h-12 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Locking in...
              </>
            ) : (
              `Lock in ${item.name} • $${item.reservationFee}`
            )}
          </button>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Valid for 2 hours. Order normally when you arrive.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}