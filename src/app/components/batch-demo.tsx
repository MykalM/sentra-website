'use client'

import { useState } from 'react'
import { BatchCard } from './batch-card'
import { BatchLockIn } from './batch-lock-in'
import { BatchConfirmation } from './batch-confirmation'
import { OperatorBatchDashboard } from './operator-batch-dashboard'

// Mock data for the revolutionary batch ordering system
const mockVenue = {
  name: 'Blue Moon Coffee',
  slug: 'blue-moon-coffee',
  location: 'Alberta Arts District, Portland'
}

const mockItem = {
  id: 'flat-white',
  name: 'Oat Milk Flat White',
  description: 'House blend espresso with premium oat milk',
  base_price: 650, // $6.50 walk-in price
  batch_tiers: [
    { id: 't1', min_count: 1, price: 600 },   // $6.00 for 1+ people
    { id: 't2', min_count: 5, price: 575 },   // $5.75 for 5+ people  
    { id: 't3', min_count: 10, price: 550 },  // $5.50 for 10+ people
    { id: 't4', min_count: 15, price: 525 },  // $5.25 for 15+ people
    { id: 't5', min_count: 20, price: 500 },  // $5.00 for 20+ people
  ],
  prep_time_minutes: 3
}

const mockBatch = {
  id: 'batch-8am',
  starts_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 min from now
  ends_at: new Date(Date.now() + 40 * 60 * 1000).toISOString(),   // 40 min from now
  prep_at: new Date(Date.now() + 35 * 60 * 1000).toISOString(),   // 35 min from now
  status: 'building' as const
}

const mockReservation = {
  id: 'res-123',
  batch_id: 'batch-8am',
  item_id: 'flat-white',
  locked_price: 575, // Locked at tier 2 price
  final_price: 550,  // Price dropped to tier 3!
  lock_fee: 100,
  redeem_code: 'K7M2PX',
  status: 'active' as const,
  created_at: new Date().toISOString()
}

// Mock batches for operator dashboard
const mockBatches = [
  {
    id: 'batch-8am',
    starts_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    ends_at: new Date(Date.now() + 40 * 60 * 1000).toISOString(),
    prep_at: new Date(Date.now() + 35 * 60 * 1000).toISOString(),
    status: 'building' as const,
    reservations: [
      {
        id: 'res-1',
        item_id: 'flat-white',
        locked_price: 575,
        final_price: 550,
        lock_fee: 100,
        redeem_code: 'ABC123',
        status: 'active' as const,
        created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        guest_eta_minutes: 12,
        vibe: 'working',
        item: mockItem
      },
      {
        id: 'res-2', 
        item_id: 'flat-white',
        locked_price: 575,
        final_price: 550,
        lock_fee: 100,
        redeem_code: 'DEF456',
        status: 'prep_triggered' as const,
        created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        guest_eta_minutes: 4,
        vibe: 'solo',
        item: mockItem
      }
    ]
  },
  {
    id: 'batch-830am',
    starts_at: new Date(Date.now() + 40 * 60 * 1000).toISOString(),
    ends_at: new Date(Date.now() + 70 * 60 * 1000).toISOString(),
    prep_at: new Date(Date.now() + 65 * 60 * 1000).toISOString(),
    status: 'building' as const,
    reservations: []
  }
]

type DemoView = 'guest' | 'lock-in' | 'confirmation' | 'operator'

export function BatchDemo() {
  const [currentView, setCurrentView] = useState<DemoView>('guest')
  const [currentCount, setCurrentCount] = useState(12) // 12 people in batch
  const [isLoading, setIsLoading] = useState(false)
  
  const handleJoinBatch = () => {
    setCurrentView('lock-in')
  }
  
  const handleLockIn = () => {
    setIsLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      setCurrentCount(prev => prev + 1) // Add user to batch
      setCurrentView('confirmation')
    }, 2000)
  }
  
  return (
    <div className="min-h-screen bg-background">
      
      {/* Demo Navigation */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">
              Sentra Batch Ordering Demo
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentView('guest')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  currentView === 'guest' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Guest View
              </button>
              <button
                onClick={() => setCurrentView('operator')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  currentView === 'operator' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Operator View
              </button>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h2 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
              🚀 Revolutionary Economics: More People = Lower Prices
            </h2>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              This is the opposite of surge pricing. When demand increases, batch efficiency improves, 
              and everyone pays less. Customers become recruiters. Everyone wins.
            </p>
          </div>
        </div>
      </div>
      
      {/* Demo Content */}
      {currentView === 'guest' && (
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-foreground mb-2">{mockVenue.name}</h2>
            <p className="text-muted-foreground">{mockVenue.location}</p>
            <p className="text-sm text-muted-foreground mt-2">
              The more people order, the cheaper it gets
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
              Current Batches
            </h3>
            <BatchCard
              batch={mockBatch}
              item={mockItem}
              currentCount={currentCount}
              onJoinBatch={handleJoinBatch}
              venueSlug={mockVenue.slug}
            />
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-4">How batch pricing works</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <span className="text-primary font-bold">1.</span>
                <span>Join a batch — price starts lower than walk-in</span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">2.</span>
                <span>Share with friends — more people = lower price for everyone</span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">3.</span>
                <span>Your price is locked — can only go down, never up</span>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-bold">4.</span>
                <span>We prep based on your location for perfect timing</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {currentView === 'lock-in' && (
        <BatchLockIn
          batch={mockBatch}
          item={mockItem}
          currentCount={currentCount}
          onLockIn={handleLockIn}
          isLoading={isLoading}
          venueName={mockVenue.name}
          venueSlug={mockVenue.slug}
        />
      )}
      
      {currentView === 'confirmation' && (
        <BatchConfirmation
          reservation={mockReservation}
          batch={mockBatch}
          item={mockItem}
          currentCount={currentCount}
          venueName={mockVenue.name}
          venueSlug={mockVenue.slug}
        />
      )}
      
      {currentView === 'operator' && (
        <OperatorBatchDashboard
          venueName={mockVenue.name}
          batches={mockBatches}
          onRedeemCode={(code) => alert(`Redeeming code: ${code}`)}
          onMarkPrepping={(batchId) => alert(`Starting prep for batch: ${batchId}`)}
          onMarkReady={(batchId) => alert(`Marking batch ready: ${batchId}`)}
        />
      )}
      
      {/* Demo Footer */}
      <div className="max-w-4xl mx-auto px-6 py-8 border-t border-border mt-8">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <h3 className="font-bold text-foreground mb-3">
            🎯 The Revolutionary Model
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-foreground mb-2">For Guests:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Lower prices for planning ahead</li>
                <li>• Price drops as friends join</li>
                <li>• Perfect timing on arrival</li>
                <li>• Social recruitment rewards</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">For Venues:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Demand visibility before rush</li>
                <li>• Batch prep efficiency</li>
                <li>• Customers recruit customers</li>
                <li>• Higher margins through volume</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}