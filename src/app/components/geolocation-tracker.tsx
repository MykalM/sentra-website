import { useState, useEffect } from "react";

interface GeolocationTrackerProps {
  item: {
    name: string;
    prepTime: number; // minutes needed to prepare
  };
  lockFee: number;
  finalPrice: number;
  code: string;
  venueName: string;
  venueAddress: string;
}

interface LocationData {
  distance: number; // miles
  eta: number; // minutes
  status: 'heading-over' | 'prep-started' | 'ready' | 'arrived';
}

export function GeolocationTracker({ 
  item, 
  lockFee, 
  finalPrice, 
  code, 
  venueName, 
  venueAddress 
}: GeolocationTrackerProps) {
  const [location, setLocation] = useState<LocationData>({
    distance: 1.2,
    eta: 8,
    status: 'heading-over'
  });
  
  const [prepStartTime, setPrepStartTime] = useState<Date | null>(null);

  // Simulate location updates and prep timing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const updateLocation = () => {
      setLocation(prev => {
        const newDistance = Math.max(0, prev.distance - 0.05); // Getting closer
        const newEta = Math.max(0, Math.round(newDistance * 6.67)); // ~4mph walking speed
        
        let newStatus = prev.status;
        
        // Trigger prep when 3 minutes away
        if (newDistance <= 0.2 && prev.status === 'heading-over') {
          newStatus = 'prep-started';
          setPrepStartTime(new Date());
        }
        
        // Ready when prep time is done
        if (newStatus === 'prep-started' && prepStartTime) {
          const timeSincePrep = (Date.now() - prepStartTime.getTime()) / (1000 * 60);
          if (timeSincePrep >= item.prepTime) {
            newStatus = 'ready';
          }
        }
        
        // Arrived when very close
        if (newDistance <= 0.05) {
          newStatus = 'arrived';
        }
        
        return {
          distance: newDistance,
          eta: newEta,
          status: newStatus
        };
      });
    };

    // Update location every 3 seconds (in real app, would be actual GPS)
    interval = setInterval(updateLocation, 3000);
    
    return () => clearInterval(interval);
  }, [item.prepTime, prepStartTime]);

  const getStatusIcon = () => {
    switch (location.status) {
      case 'heading-over': return '🚶‍♂️';
      case 'prep-started': return '👨‍🍳';
      case 'ready': return '✅';
      case 'arrived': return '🎉';
    }
  };

  const getStatusMessage = () => {
    switch (location.status) {
      case 'heading-over': 
        return `We'll start your ${item.name} when you're ${item.prepTime + 1} min away`;
      case 'prep-started': 
        return `Your ${item.name} is being prepared now`;
      case 'ready': 
        return `Your ${item.name} is ready for pickup!`;
      case 'arrived': 
        return `Welcome! Show code ${code} to complete your order`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="text-center px-6 py-8 bg-card border-b border-border">
        <h1 className="text-2xl font-semibold text-foreground mb-1">
          {venueName}
        </h1>
        <p className="text-sm text-muted-foreground">
          {venueAddress}
        </p>
      </header>

      <main className="max-w-md mx-auto p-6">
        
        {/* Status Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{getStatusIcon()}</div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Locked & Tracked
          </h2>
          <p className="text-muted-foreground">
            {getStatusMessage()}
          </p>
        </div>

        {/* Location Status */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Your Location</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live tracking</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{location.distance.toFixed(1)}</div>
              <div className="text-xs text-muted-foreground">miles away</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{location.eta}</div>
              <div className="text-xs text-muted-foreground">min ETA</div>
            </div>
          </div>
        </div>

        {/* Prep Timeline */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4">Your Order Timeline</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                location.status !== 'heading-over' ? 'bg-green-500' : 'bg-primary'
              }`}>
                <span className="text-white text-xs font-semibold">✓</span>
              </div>
              <div>
                <div className="font-medium text-foreground">Locked in discount</div>
                <div className="text-sm text-muted-foreground">Saved ${(finalPrice + lockFee - finalPrice).toFixed(2)} vs walk-in price</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                location.status === 'prep-started' || location.status === 'ready' || location.status === 'arrived' 
                  ? 'bg-green-500' 
                  : location.status === 'heading-over' && location.eta <= item.prepTime + 1
                    ? 'bg-primary animate-pulse'
                    : 'border-2 border-border bg-background'
              }`}>
                <span className="text-white text-xs font-semibold">
                  {location.status === 'prep-started' || location.status === 'ready' || location.status === 'arrived' ? '✓' : '2'}
                </span>
              </div>
              <div>
                <div className="font-medium text-foreground">Prep started</div>
                <div className="text-sm text-muted-foreground">
                  {location.status === 'prep-started' || location.status === 'ready' || location.status === 'arrived'
                    ? `Started when you were ${item.prepTime + 1} min away`
                    : `Will start when you're ${item.prepTime + 1} min away`
                  }
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                location.status === 'ready' || location.status === 'arrived'
                  ? 'bg-green-500'
                  : 'border-2 border-border bg-background'
              }`}>
                <span className={`text-xs font-semibold ${
                  location.status === 'ready' || location.status === 'arrived' ? 'text-white' : 'text-muted-foreground'
                }`}>
                  {location.status === 'ready' || location.status === 'arrived' ? '✓' : '3'}
                </span>
              </div>
              <div>
                <div className="font-medium text-foreground">Ready for pickup</div>
                <div className="text-sm text-muted-foreground">
                  {location.status === 'ready' || location.status === 'arrived'
                    ? 'Your order is ready!'
                    : `~${item.prepTime} min prep time`
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-background border border-border rounded-xl p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-sm text-muted-foreground mb-2">YOUR CODE</div>
            <div className="text-3xl font-mono font-bold text-primary tracking-wider mb-2">
              {code}
            </div>
            <div className="text-sm text-muted-foreground">
              Show this code when you arrive
            </div>
          </div>
          
          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Item</span>
              <span className="font-medium text-foreground">{item.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Your price</span>
              <span className="font-bold text-foreground">${finalPrice}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {location.status === 'arrived' && (
          <button className="w-full bg-green-600 text-white h-12 rounded-lg font-medium hover:bg-green-700 transition-colors mb-4">
            I'm here! Complete my order
          </button>
        )}

        {/* Navigation */}
        <button 
          onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(venueName + ' ' + venueAddress)}`, '_blank')}
          className="w-full border border-border text-foreground h-12 rounded-lg font-medium hover:bg-muted transition-colors"
        >
          Get directions to {venueName}
        </button>

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            We use your location to time your order perfectly • Questions? Ask your server about Sentra
          </p>
        </div>
      </main>
    </div>
  );
}