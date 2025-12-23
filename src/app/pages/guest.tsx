import { useState, useEffect } from "react";

interface GuestProps {
  venue?: string;
}

export function GuestPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isReserving, setIsReserving] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  // Get venue from URL params (simulate QR code scan)
  const venue = new URLSearchParams(window.location.search).get('venue') || 'escape-360';

  useEffect(() => {
    document.title = "Menu — Sentra";
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock venue and item data (in production this would come from the backend)
  const venueData = {
    name: "Escape 360 Wine Bar",
    location: "Downtown Portland",
    atmosphere: "Intimate wine bar with rotating selections"
  };

  const featuredItem = {
    id: '1',
    name: "Burgundian Chardonnay",
    description: "2019 Domaine Leflaive Puligny-Montrachet",
    details: "Rich, mineral-driven white with notes of green apple, citrus, and subtle oak. Perfect with seafood or enjoyed on its own.",
    currentPrice: 24,
    basePrice: 22,
    reservationFee: 2,
    demandLevel: "High" as const,
    availableGlasses: 8,
    imageUrl: "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400&h=600&fit=crop"
  };

  const getTimeOfDay = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'This morning';
    if (hour < 17) return 'This afternoon';
    if (hour < 20) return 'This evening';
    return 'Tonight';
  };

  const handleReservePrice = async () => {
    setIsReserving(true);
    
    // Simulate API call to create reservation
    setTimeout(() => {
      setIsReserving(false);
      setReserved(true);
      // Generate a realistic reservation code
      const codes = ['ABC123', 'DEF456', 'GHI789', 'JKL012', 'MNO345'];
      setReservationCode(codes[Math.floor(Math.random() * codes.length)]);
    }, 2000);
  };

  if (reserved) {
    return <ReservationConfirmation 
      venue={venueData} 
      item={featuredItem} 
      code={reservationCode}
      currentTime={currentTime}
    />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="text-center px-6 py-8 bg-card border-b border-border">
        <p className="text-sm text-muted-foreground mb-2">
          {getTimeOfDay()} at
        </p>
        <h1 className="text-2xl font-semibold text-foreground mb-1">
          {venueData.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          {venueData.location}
        </p>
      </header>

      <main className="max-w-md mx-auto p-6">
        
        {/* Featured Item Card */}
        <div className="bg-card border border-border rounded-xl overflow-hidden mb-6">
          {/* Item Image */}
          <div className="aspect-[4/3] bg-muted">
            <img 
              src={featuredItem.imageUrl}
              alt={featuredItem.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Item Details */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-semibold text-foreground">
                    {featuredItem.name}
                  </h2>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    featuredItem.demandLevel === 'High' ? 'bg-red-100 text-red-700' :
                    featuredItem.demandLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {featuredItem.demandLevel} demand
                  </span>
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  {featuredItem.description}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {featuredItem.details}
                </p>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-background border border-border rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-muted-foreground">Tonight's price</span>
                <div className="text-right">
                  <span className="text-2xl font-semibold text-foreground">
                    ${featuredItem.currentPrice}
                  </span>
                  {featuredItem.currentPrice > featuredItem.basePrice && (
                    <p className="text-xs text-muted-foreground">
                      Base price: ${featuredItem.basePrice}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Reserve for</span>
                <span className="font-semibold text-primary">
                  ${featuredItem.reservationFee}
                </span>
              </div>
            </div>

            {/* Reserve Button */}
            <button
              onClick={handleReservePrice}
              disabled={isReserving}
              className="w-full bg-primary text-primary-foreground h-12 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-base"
            >
              {isReserving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Reserving price...
                </>
              ) : (
                `Reserve ${featuredItem.name} — $${featuredItem.reservationFee}`
              )}
            </button>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <h3 className="font-semibold text-foreground mb-4">How this works</h3>
          <div className="space-y-3 text-sm text-muted-foreground text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-xs font-semibold">1</span>
              </div>
              <p>Reserve this price for ${featuredItem.reservationFee} (refundable)</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-xs font-semibold">2</span>
              </div>
              <p>If you order, the ${featuredItem.reservationFee} becomes your discount</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-xs font-semibold">3</span>
              </div>
              <p>If you don't order, it releases automatically in 30 minutes</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Only {featuredItem.availableGlasses} glasses available tonight
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function ReservationConfirmation({ 
  venue, 
  item, 
  code, 
  currentTime 
}: { 
  venue: any, 
  item: any, 
  code: string,
  currentTime: Date 
}) {
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (timeRemaining / (30 * 60)) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="text-center px-6 py-8 bg-card border-b border-border">
        <h1 className="text-2xl font-semibold text-foreground mb-1">
          {venue.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          {venue.location}
        </p>
      </header>

      <main className="max-w-md mx-auto p-6">
        
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Price Reserved!
          </h2>
          <p className="text-muted-foreground">
            Your {item.name} is reserved at ${item.currentPrice}
          </p>
        </div>

        {/* Reservation Details Card */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Your Reservation</h3>
            <div className="text-3xl font-mono font-bold text-primary mb-2">
              {code}
            </div>
            <p className="text-sm text-muted-foreground">
              Show this code to your server
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Item</span>
              <span className="font-medium text-foreground">{item.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Reserved price</span>
              <span className="font-medium text-foreground">${item.currentPrice}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Reservation fee</span>
              <span className="font-medium text-foreground">${item.reservationFee}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">If you order</span>
              <span className="font-medium text-green-600">
                Pay ${item.currentPrice - item.reservationFee}
              </span>
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="text-center mb-4">
            <h3 className="font-semibold text-foreground mb-2">Time Remaining</h3>
            <div className="text-2xl font-mono font-semibold text-primary">
              {formatTime(timeRemaining)}
            </div>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <p className="text-xs text-center text-muted-foreground">
            Reservation expires automatically if not used
          </p>
        </div>

        {/* Next Steps */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">What's next?</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-xs font-semibold">1</span>
              </div>
              <p>Flag down your server or bartender</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-xs font-semibold">2</span>
              </div>
              <p>Show them your reservation code: <strong>{code}</strong></p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-xs font-semibold">3</span>
              </div>
              <p>Enjoy your {item.name} at the reserved price!</p>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Questions? Ask your server about Sentra
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}