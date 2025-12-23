import { useState, useEffect } from "react";

interface Reservation {
  id: string;
  code: string;
  status: 'active' | 'redeemed' | 'expired';
  expiresAt: string;
  redeemedAt?: string;
  amount: number;
}

export function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState<string[]>([]);
  
  // Simulate real-time updates
  useEffect(() => {
    document.title = "Dashboard — Sentra";
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock real-time data (in production this would come from your backend)
  const venue = {
    name: "Escape 360 Wine Bar",
    location: "Downtown Portland"
  };

  const todayStats = {
    qrViews: 73,
    activeReservations: 12,
    totalReservations: 28,
    redeemed: 9,
    revenue: 1247,
    conversionRate: Math.round((9 / 28) * 100)
  };

  const featuredItem = {
    name: "Burgundian Chardonnay",
    description: "2019 Domaine Leflaive Puligny-Montrachet",
    currentPrice: 24,
    basePrice: 22,
    reservationFee: 2,
    demandLevel: "High" as const
  };

  const activeReservations: Reservation[] = [
    { id: '1', code: 'ABC123', status: 'active', expiresAt: new Date(Date.now() + 15 * 60000).toISOString(), amount: 2 },
    { id: '2', code: 'DEF456', status: 'active', expiresAt: new Date(Date.now() + 22 * 60000).toISOString(), amount: 2 },
    { id: '3', code: 'GHI789', status: 'active', expiresAt: new Date(Date.now() + 8 * 60000).toISOString(), amount: 2 },
    { id: '4', code: 'JKL012', status: 'active', expiresAt: new Date(Date.now() + 27 * 60000).toISOString(), amount: 2 },
    { id: '5', code: 'MNO345', status: 'active', expiresAt: new Date(Date.now() + 12 * 60000).toISOString(), amount: 2 }
  ];

  const recentActivity: Reservation[] = [
    { id: '6', code: 'PQR678', status: 'redeemed', expiresAt: '', redeemedAt: new Date(Date.now() - 5 * 60000).toISOString(), amount: 2 },
    { id: '7', code: 'STU901', status: 'redeemed', expiresAt: '', redeemedAt: new Date(Date.now() - 12 * 60000).toISOString(), amount: 2 },
    { id: '8', code: 'VWX234', status: 'expired', expiresAt: new Date(Date.now() - 2 * 60000).toISOString(), amount: 2 },
    { id: '9', code: 'YZA567', status: 'redeemed', expiresAt: '', redeemedAt: new Date(Date.now() - 18 * 60000).toISOString(), amount: 2 }
  ];

  const formatTimeRemaining = (expiresAt: string) => {
    const now = currentTime.getTime();
    const expires = new Date(expiresAt).getTime();
    const diff = expires - now;
    
    if (diff <= 0) return "Expired";
    
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = currentTime.getTime();
    const time = new Date(timestamp).getTime();
    const diff = now - time;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "Just now";
    if (minutes === 1) return "1 min ago";
    return `${minutes} mins ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground text-lg font-semibold">S</span>
              </div>
              <h3 className="text-xl text-foreground font-semibold tracking-tight">Sentra</h3>
            </a>
            <div className="h-6 w-px bg-border mx-2"></div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">{venue.name}</h1>
              <p className="text-sm text-muted-foreground">{venue.location}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: 'numeric', 
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </p>
            </div>
            
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              Redeem Code
            </button>
            
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">QR Scans Today</h3>
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-2xl font-semibold text-foreground">{todayStats.qrViews}</p>
            <p className="text-xs text-green-500 mt-1">↑ 12% from yesterday</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Active Reservations</h3>
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
            <p className="text-2xl font-semibold text-primary">{todayStats.activeReservations}</p>
            <p className="text-xs text-muted-foreground mt-1">{todayStats.totalReservations} total today</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Redeemed</h3>
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-2xl font-semibold text-green-500">{todayStats.redeemed}</p>
            <p className="text-xs text-muted-foreground mt-1">${todayStats.revenue} revenue</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Conversion Rate</h3>
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <p className="text-2xl font-semibold text-foreground">{todayStats.conversionRate}%</p>
            <p className="text-xs text-green-500 mt-1">↑ 5% from last week</p>
          </div>
        </div>

        {/* Featured Item */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Tonight's Featured Item</h2>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-medium text-foreground">{featuredItem.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  featuredItem.demandLevel === 'High' ? 'bg-red-100 text-red-700' :
                  featuredItem.demandLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {featuredItem.demandLevel} Demand
                </span>
              </div>
              <p className="text-muted-foreground">{featuredItem.description}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-foreground">${featuredItem.currentPrice}</p>
              <p className="text-sm text-muted-foreground">Base: ${featuredItem.basePrice}</p>
              <p className="text-xs text-primary">+${featuredItem.currentPrice - featuredItem.basePrice} demand premium</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 p-4 bg-background border border-border rounded-lg">
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">{activeReservations.length}</p>
              <p className="text-sm text-muted-foreground">Active Reservations</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">${featuredItem.reservationFee}</p>
              <p className="text-sm text-muted-foreground">Reservation Fee</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">${activeReservations.length * featuredItem.reservationFee}</p>
              <p className="text-sm text-muted-foreground">Potential Revenue</p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Active Reservations */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-foreground">Active Reservations</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Live</span>
              </div>
            </div>
            
            {activeReservations.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {activeReservations.map((reservation) => (
                  <div key={reservation.id} className="bg-background border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-mono text-sm font-semibold text-foreground">{reservation.code}</span>
                        <p className="text-xs text-muted-foreground">${reservation.amount} reserved</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-primary">
                          {formatTimeRemaining(reservation.expiresAt)}
                        </span>
                        <p className="text-xs text-muted-foreground">remaining</p>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1">
                      <div 
                        className="bg-primary h-1 rounded-full transition-all duration-1000"
                        style={{
                          width: `${Math.max(0, Math.min(100, 
                            ((new Date(reservation.expiresAt).getTime() - currentTime.getTime()) / (30 * 60000)) * 100
                          ))}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No active reservations</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {todayStats.qrViews} guests have viewed the menu today
                </p>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="bg-background border border-border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-mono text-sm font-semibold text-foreground">{activity.code}</span>
                      <p className="text-xs text-muted-foreground">${activity.amount}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {activity.status === 'redeemed' && (
                        <>
                          <span className="text-green-500 text-sm">✓ Redeemed</span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(activity.redeemedAt!)}
                          </span>
                        </>
                      )}
                      {activity.status === 'expired' && (
                        <>
                          <span className="text-muted-foreground text-sm">⏱ Expired</span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(activity.expiresAt)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}