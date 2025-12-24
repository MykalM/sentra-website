'use client'

import { useState, useEffect } from 'react'
import { formatPrice, formatTime } from '../utils/format'

interface BatchTier {
  id: string
  min_count: number
  price: number
}

interface BatchItem {
  id: string
  name: string
  description: string
  base_price: number
  batch_tiers: BatchTier[]
  prep_time_minutes: number
}

interface Batch {
  id: string
  starts_at: string
  ends_at: string
  prep_at: string
  status: string
}

interface BatchLockInProps {
  batch: Batch
  item: BatchItem
  currentCount: number
  onLockIn: (data: {
    batchId: string
    itemId: string
    lockedPrice: number
    vibe?: string
  }) => void
  isLoading: boolean
  venueName: string
  venueSlug: string
}

const LOCK_FEE = 100 // $1.00 in cents

const vibes = [
  { id: 'solo', label: 'Solo', emoji: '☕' },
  { id: 'working', label: 'Working', emoji: '💻' },
  { id: 'with_someone', label: 'With someone', emoji: '👥' },
  { id: 'quick_stop', label: 'Quick stop', emoji: '🏃' },
  { id: 'relaxing', label: 'Relaxing', emoji: '☀️' },
  { id: 'family', label: 'Family', emoji: '👨‍👩‍👧' },
]

export function BatchLockIn({
  batch,
  item,
  currentCount,
  onLockIn,
  isLoading,
  venueName,
  venueSlug
}: BatchLockInProps) {
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null)
  const [liveCount, setLiveCount] = useState(currentCount)
  
  // Get current pricing
  const sortedTiers = [...item.batch_tiers].sort((a, b) => a.min_count - b.min_count)
  const getCurrentTier = () => {
    const reversed = [...sortedTiers].reverse()
    return reversed.find(tier => tier.min_count <= liveCount + 1) || sortedTiers[0]
  }
  
  const getNextTier = () => {
    return sortedTiers.find(tier => tier.min_count > liveCount)
  }
  
  const currentTier = getCurrentTier()
  const nextTier = getNextTier()
  const currentPrice = currentTier.price
  const finalPrice = currentPrice - LOCK_FEE
  const totalSavings = item.base_price - currentPrice + LOCK_FEE
  const peopleNeeded = nextTier ? nextTier.min_count - liveCount : 0
  
  const handleLockIn = () => {
    onLockIn({
      batchId: batch.id,
      itemId: item.id,
      lockedPrice: currentPrice,
      vibe: selectedVibe || undefined
    })
  }
  
  return (
    <div className=\"max-w-md mx-auto px-4 py-6\">
      
      {/* Header */}
      <div className=\"text-center mb-6\">
        <h1 className=\"text-2xl font-bold text-foreground mb-2\">
          Join the batch
        </h1>
        <p className=\"text-muted-foreground\">
          {formatTime(new Date(batch.starts_at))} - {formatTime(new Date(batch.ends_at))} at {venueName}
        </p>
      </div>
      
      {/* Item Card */}
      <div className=\"bg-card border border-border rounded-xl p-6 shadow-sm mb-6\">
        <h2 className=\"font-semibold text-foreground text-lg mb-2\">{item.name}</h2>
        {item.description && (
          <p className=\"text-sm text-muted-foreground mb-4\">{item.description}</p>
        )}
        
        {/* Live Batch Stats */}
        <div className=\"bg-background rounded-xl p-4 mb-4\">
          <div className=\"flex justify-between items-center mb-3\">
            <span className=\"text-sm text-muted-foreground\">People in batch</span>
            <div className=\"flex items-center gap-2\">
              <span className=\"font-medium text-foreground\">{liveCount}</span>
              <div className=\"w-2 h-2 bg-green-500 rounded-full animate-pulse\"></div>
            </div>
          </div>
          
          <div className=\"flex justify-between items-center mb-2\">
            <span className=\"text-sm text-muted-foreground\">Your batch price</span>
            <span className=\"font-medium text-foreground\">${formatPrice(currentPrice)}</span>
          </div>
          
          <div className=\"flex justify-between items-center mb-3\">
            <span className=\"text-sm text-muted-foreground\">Walk-in price</span>
            <span className=\"text-muted-foreground line-through\">${formatPrice(item.base_price)}</span>
          </div>
          
          {nextTier && peopleNeeded > 0 && (
            <div className=\"pt-3 border-t border-border\">
              <div className=\"bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3\">
                <div className=\"flex items-center gap-2 text-blue-700 dark:text-blue-300 text-sm\">
                  <span>🎉</span>
                  <div>
                    <div className=\"font-medium\">
                      {peopleNeeded} more {peopleNeeded === 1 ? 'person' : 'people'} = ${formatPrice(nextTier.price)} for everyone!
                    </div>
                    <div className=\"text-xs\">
                      Share this batch to unlock lower prices
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Price Breakdown */}
        <div className=\"space-y-2 mb-4\">
          <div className=\"flex justify-between\">
            <span className=\"text-muted-foreground\">Batch price (locked)</span>
            <span className=\"text-foreground\">${formatPrice(currentPrice)}</span>
          </div>
          <div className=\"flex justify-between\">
            <span className=\"text-muted-foreground\">Lock fee (becomes credit)</span>
            <span className=\"text-foreground\">-${formatPrice(LOCK_FEE)}</span>
          </div>
          <div className=\"flex justify-between pt-2 border-t border-border font-medium\">
            <span className=\"text-foreground\">You pay at pickup</span>
            <span className=\"text-foreground\">${formatPrice(finalPrice)}</span>
          </div>
        </div>
        
        <div className=\"bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-center\">
          <p className=\"text-green-700 dark:text-green-300 text-sm font-medium\">
            You save ${formatPrice(totalSavings)} vs walk-in
          </p>
        </div>
      </div>
      
      {/* Vibe Selector */}
      <div className=\"bg-card border border-border rounded-xl p-6 shadow-sm mb-6\">
        <h3 className=\"font-medium text-foreground mb-3\">What's the vibe today? (optional)</h3>
        <div className=\"grid grid-cols-3 gap-2\">
          {vibes.map((vibe) => (
            <button
              key={vibe.id}
              onClick={() => setSelectedVibe(selectedVibe === vibe.id ? null : vibe.id)}
              className={`p-3 rounded-lg text-center text-sm transition-colors ${
                selectedVibe === vibe.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background border border-border text-foreground hover:bg-muted'
              }`}
            >
              <span className=\"block text-lg mb-1\">{vibe.emoji}</span>
              {vibe.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Lock Button */}
      <button
        onClick={handleLockIn}
        disabled={isLoading}
        className=\"w-full bg-primary text-primary-foreground h-12 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-base\"
      >
        {isLoading ? (
          <>
            <svg className=\"animate-spin -ml-1 mr-3 h-5 w-5\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">
              <circle className=\"opacity-25\" cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" strokeWidth=\"4\"></circle>
              <path className=\"opacity-75\" fill=\"currentColor\" d=\"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z\"></path>
            </svg>
            Locking in...
          </>
        ) : (
          `Lock in • Pay $${formatPrice(LOCK_FEE)} now`
        )}
      </button>
      
      <p className=\"text-center text-xs text-muted-foreground mt-3\">
        Your $${formatPrice(LOCK_FEE)} becomes credit • Price can only go down • Final: $${formatPrice(finalPrice)}
      </p>
      
      {/* How It Works */}
      <div className=\"mt-6 bg-background border border-border rounded-xl p-4\">
        <h4 className=\"font-medium text-foreground mb-3\">How batch pricing works:</h4>
        <div className=\"space-y-2 text-sm text-muted-foreground\">
          <div className=\"flex items-start gap-2\">
            <span className=\"text-primary font-bold\">1.</span>
            <span>Lock your price now — it can only go down</span>
          </div>
          <div className=\"flex items-start gap-2\">
            <span className=\"text-primary font-bold\">2.</span>
            <span>Share with friends — more people = lower price for everyone</span>
          </div>
          <div className=\"flex items-start gap-2\">
            <span className=\"text-primary font-bold\">3.</span>
            <span>We prep when you're close for perfect timing</span>
          </div>
          <div className=\"flex items-start gap-2\">
            <span className=\"text-primary font-bold\">4.</span>
            <span>Arrive to ready order at your locked price (or less!)</span>
          </div>
        </div>
      </div>
    </div>
  )
}