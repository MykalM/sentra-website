import { useState, useEffect } from "react";

interface CommittedOrder {
  id: string;
  code: string;
  item: string;
  customer: string;
  lockedAt: Date;
  eta: number; // minutes
  distance: number; // miles
  prepTime: number; // minutes needed
  finalPrice: number;
  status: 'locked' | 'en-route' | 'prep-needed' | 'prepping' | 'ready' | 'completed';
}

interface DemandForecast {
  timeSlot: string;
  committedOrders: number;
  estimatedWalkIns: number;
  totalProjected: number;
  staffCapacity: number;
  needsMoreStaff: boolean;
}

export function OperatorIntelligence() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock committed orders
  const committedOrders: CommittedOrder[] = [
    {
      id: '1',
      code: 'K7M2PX',
      item: 'Oat Milk Flat White',
      customer: 'Sarah M.',
      lockedAt: new Date(Date.now() - 5 * 60 * 1000),
      eta: 3,
      distance: 0.2,
      prepTime: 2,
      finalPrice: 4.50,
      status: 'prep-needed'
    },
    {
      id: '2',
      code: 'R3J8QL',
      item: 'Cold Brew',
      customer: 'Mike T.',
      lockedAt: new Date(Date.now() - 10 * 60 * 1000),
      eta: 8,
      distance: 1.1,
      prepTime: 1,
      finalPrice: 3.75,
      status: 'en-route'
    },
    {
      id: '3',
      code: 'M9N4KT',
      item: 'Matcha Latte',
      customer: 'Alex K.',
      lockedAt: new Date(Date.now() - 2 * 60 * 1000),
      eta: 4,
      distance: 0.4,
      prepTime: 3,
      finalPrice: 5.25,
      status: 'prep-needed'
    },
    {
      id: '4',
      code: 'P2K9TL',
      item: 'Lavender Honey Latte',
      customer: 'Emma S.',
      lockedAt: new Date(Date.now() - 15 * 60 * 1000),
      eta: 15,
      distance: 2.3,
      prepTime: 2,
      finalPrice: 5.00,
      status: 'en-route'
    }
  ];

  // Mock demand forecast
  const demandForecast: DemandForecast[] = [
    {
      timeSlot: '8:00-8:30',
      committedOrders: 18,
      estimatedWalkIns: 8,
      totalProjected: 26,
      staffCapacity: 20,
      needsMoreStaff: true
    },
    {
      timeSlot: '8:30-9:00', 
      committedOrders: 14,
      estimatedWalkIns: 6,
      totalProjected: 20,
      staffCapacity: 20,
      needsMoreStaff: false
    },
    {
      timeSlot: '9:00-9:30',
      committedOrders: 7,
      estimatedWalkIns: 4,
      totalProjected: 11,
      staffCapacity: 20,
      needsMoreStaff: false
    }
  ];

  const getStatusColor = (status: CommittedOrder['status']) => {
    switch (status) {
      case 'prep-needed': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'prepping': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ready': return 'bg-green-100 text-green-800 border-green-200';
      case 'en-route': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const prepNeeded = committedOrders.filter(order => 
    order.status === 'prep-needed' && order.eta <= order.prepTime + 1
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Blue Moon Coffee</h1>
            <p className="text-sm text-muted-foreground">Operator Intelligence Dashboard</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-foreground">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentTime.toLocaleDateString()}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Urgent Prep Alerts */}
        {prepNeeded.length > 0 && (
          <div className="mb-8">
            <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <h2 className="text-xl font-bold text-orange-700 dark:text-orange-300">
                  🔔 PREP NOW ({prepNeeded.length} orders)
                </h2>
              </div>
              <div className="grid gap-3">
                {prepNeeded.map(order => (
                  <div key={order.id} className="bg-white dark:bg-gray-800 border border-orange-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="font-mono text-lg font-bold text-primary">
                        {order.code}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{order.item}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.customer} • {order.distance.toFixed(1)} mi away • {order.eta} min ETA
                        </div>
                      </div>
                    </div>
                    <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                      Start Prep
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Demand Forecast */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Incoming Demand (Next 2 Hours)
              </h2>
              
              <div className="space-y-4">
                {demandForecast.map((slot, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{slot.timeSlot}</span>
                      <span className="text-sm text-muted-foreground">
                        {slot.totalProjected} total orders
                      </span>
                    </div>
                    
                    <div className="relative">
                      {/* Capacity Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all ${
                            slot.needsMoreStaff ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min((slot.totalProjected / slot.staffCapacity) * 100, 100)}%` }}
                        ></div>
                      </div>
                      
                      {/* Labels */}
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Committed: {slot.committedOrders} • Walk-ins: ~{slot.estimatedWalkIns}</span>
                        <span>Capacity: {slot.staffCapacity}</span>
                      </div>
                    </div>
                    
                    {slot.needsMoreStaff && (
                      <div className="text-sm text-orange-600 font-medium">
                        ⚠️ Exceeds capacity by {slot.totalProjected - slot.staffCapacity} orders
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Staffing Suggestions */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Smart Suggestions</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <span className="text-yellow-600 text-lg">⚠️</span>
                  <div>
                    <div className="font-medium text-yellow-800 dark:text-yellow-200">
                      Call in backup for 8:00-8:30 rush
                    </div>
                    <div className="text-sm text-yellow-700 dark:text-yellow-300">
                      18 committed + ~8 walk-ins = 26 orders (exceeds current capacity of 20)
                    </div>
                    <button className="text-sm text-yellow-800 dark:text-yellow-200 underline mt-1">
                      Call Maria (15 min away)
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <span className="text-blue-600 text-lg">💡</span>
                  <div>
                    <div className="font-medium text-blue-800 dark:text-blue-200">
                      Pre-prep oat milk for rush
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      12 oat milk drinks committed for next hour
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Prep Queue */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Live Prep Queue
            </h2>
            
            <div className="space-y-3">
              {committedOrders
                .sort((a, b) => a.eta - b.eta)
                .map(order => (
                <div key={order.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="font-mono text-sm font-bold text-primary">
                        {order.code}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {order.eta} min • {order.distance.toFixed(1)} mi
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">{order.item}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.customer} • ${order.finalPrice}
                      </div>
                    </div>
                    
                    {order.status === 'prep-needed' && (
                      <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium hover:bg-primary/90 transition-colors">
                        {order.eta <= order.prepTime + 1 ? 'START NOW' : `WAIT ${order.eta - order.prepTime - 1}m`}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Summary */}
        <div className="mt-8 bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Today's Intelligence</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">39</div>
              <div className="text-sm text-muted-foreground">Orders Locked Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$163.50</div>
              <div className="text-sm text-muted-foreground">Committed Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">47 min</div>
              <div className="text-sm text-muted-foreground">Avg Lead Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">98%</div>
              <div className="text-sm text-muted-foreground">On-Time Prep Rate</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}