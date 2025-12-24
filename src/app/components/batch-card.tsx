'use client'

import { useState, useEffect } from 'react'
import { formatPrice, formatTime } from '../utils/format'

interface BatchTier {
  id: string
  min_count: number
  price: number // cents
}

interface BatchItem {
  id: string
  name: string
  description: string
  base_price: number // walk-in price in cents
  batch_tiers: BatchTier[]
}

interface Batch {
  id: string
  starts_at: string
  ends_at: string
  prep_at: string
  status: 'building' | 'locked' | 'prepping' | 'ready' | 'complete'
}

interface BatchCardProps {
  batch: Batch
  item: BatchItem
  currentCount: number
  onJoinBatch: (batchId: string, itemId: string) => void
  venueSlug: string
}

export function BatchCard({ 
  batch, 
  item, 
  currentCount, 
  onJoinBatch, 
  venueSlug 
}: BatchCardProps) {
  const [liveCount, setLiveCount] = useState(currentCount)
  
  // Sort tiers by min_count
  const sortedTiers = [...item.batch_tiers].sort((a, b) => a.min_count - b.min_count)
  
  // Get current tier (what price they'd pay if they join now)
  const getCurrentTier = () => {
    const reversed = [...sortedTiers].reverse()
    return reversed.find(tier => tier.min_count <= liveCount + 1) || sortedTiers[0]
  }
  
  // Get next tier (what price everyone gets if more people join)
  const getNextTier = () => {
    return sortedTiers.find(tier => tier.min_count > liveCount)
  }
  
  const currentTier = getCurrentTier()
  const nextTier = getNextTier()
  const currentPrice = currentTier.price
  const walkInPrice = item.base_price
  const savings = walkInPrice - currentPrice
  const peopleNeeded = nextTier ? nextTier.min_count - liveCount : 0
  
  // Calculate progress for visual bar
  const maxTier = sortedTiers[sortedTiers.length - 1]
  const progress = Math.min((liveCount / maxTier.min_count) * 100, 100)
  
  const getTimeLabel = () => {
    const start = new Date(batch.starts_at)
    const end = new Date(batch.ends_at)
    return `${formatTime(start)} - ${formatTime(end)}`
  }
  
  const isCurrentBatch = () => {
    const now = new Date()
    const start = new Date(batch.starts_at)
    const end = new Date(batch.ends_at)
    return start <= now && end > now
  }
  
  const getStatusColor = () => {
    switch (batch.status) {
      case 'building': return isCurrentBatch() ? 'border-primary bg-primary/5' : 'border-border'
      case 'locked': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10'
      case 'prepping': return 'border-orange-500 bg-orange-50 dark:bg-orange-900/10'
      case 'ready': return 'border-green-500 bg-green-50 dark:bg-green-900/10'
      default: return 'border-border'
    }
  }
  
  const canJoin = batch.status === 'building' && new Date() < new Date(batch.prep_at)
  
  return (
    <div className={`bg-card rounded-2xl p-6 shadow-sm border transition-all ${getStatusColor()}`}>
      
      {/* Batch Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className=\"flex items-center gap-2 mb-1\">
            <h3 className=\"font-medium text-foreground\">{getTimeLabel()}</h3>
            {isCurrentBatch() && batch.status === 'building' && (
              <span className=\"px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full animate-pulse\">
                Live
              </span>
            )}
          </div>
          <p className=\"text-sm text-muted-foreground capitalize\">
            {batch.status === 'building' ? (isCurrentBatch() ? 'Join now!' : 'Opens soon') : batch.status}
          </p>
        </div>
        <div className=\"text-right\">
          <div className=\"text-2xl font-bold text-foreground\">{liveCount}</div>
          <div className=\"text-xs text-muted-foreground\">
            {liveCount === 1 ? 'person' : 'people'}
          </div>
        </div>
      </div>
      
      {/* Item Info */}
      <div className=\"mb-4\">
        <h4 className=\"font-semibold text-foreground text-lg mb-1\">{item.name}</h4>
        {item.description && (
          <p className=\"text-sm text-muted-foreground\">{item.description}</p>
        )}
      </div>
      
      {/* Price Display */}
      <div className=\"bg-background border border-border rounded-xl p-4 mb-4\">
        <div className=\"flex justify-between items-center mb-3\">
          <div>
            <div className=\"text-2xl font-bold text-foreground\">
              ${formatPrice(currentPrice)}
            </div>
            <div className=\"text-xs text-muted-foreground line-through\">
              ${formatPrice(walkInPrice)} walk-in
            </div>
          </div>
          <div className=\"text-right\">
            <div className=\"text-green-600 font-medium\">
              Save ${formatPrice(savings)}
            </div>
            <div className=\"text-xs text-muted-foreground\">
              vs walk-in price
            </div>
          </div>
        </div>
        
        {/* Next Tier Callout */}
        {nextTier && peopleNeeded > 0 && (
          <div className=\"bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3\">
            <div className=\"flex items-center gap-2 text-blue-700 dark:text-blue-300 text-sm\">
              <span className=\"text-lg\">🎉</span>
              <div>
                <span className=\"font-medium\">
                  {peopleNeeded} more {peopleNeeded === 1 ? 'person' : 'people'} = ${formatPrice(nextTier.price)} for everyone!
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Tier Progress Bar */}
      <div className=\"mb-4\">
        <div className=\"flex justify-between text-xs text-muted-foreground mb-2\">
          <span>Batch progress</span>
          <span>Price drops as more join →</span>
        </div>
        
        <div className=\"relative h-3 bg-muted rounded-full overflow-hidden mb-3\">
          <div 
            className=\"h-full bg-gradient-to-r from-orange-500 via-blue-500 to-green-500 transition-all duration-500\"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Tier Markers */}
        <div className=\"relative h-8\">
          {sortedTiers.map((tier, index) => {
            const position = (tier.min_count / maxTier.min_count) * 100
            const isActive = liveCount >= tier.min_count
            const isCurrent = tier.id === currentTier.id
            
            return (
              <div
                key={tier.id}
                className=\"absolute transform -translate-x-1/2\"
                style={{ left: `${Math.min(position, 95)}%` }}
              >
                <div className={`w-2 h-2 rounded-full mb-1 ${
                  isCurrent 
                    ? 'bg-primary ring-2 ring-primary/30' 
                    : isActive 
                      ? 'bg-green-500' 
                      : 'bg-muted-foreground/30'
                }`} />
                <div className=\"text-xs text-center whitespace-nowrap\">
                  <div className={`font-medium ${
                    isCurrent ? 'text-primary' : isActive ? 'text-green-600' : 'text-muted-foreground'
                  }`}>
                    ${formatPrice(tier.price)}
                  </div>
                  <div className=\"text-muted-foreground text-xs\">
                    {tier.min_count}+
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Action Button */}
      {canJoin ? (
        <button
          onClick={() => onJoinBatch(batch.id, item.id)}
          className=\"w-full bg-primary text-primary-foreground h-12 rounded-lg font-medium hover:bg-primary/90 transition-colors\"
        >
          Join batch • ${formatPrice(currentPrice)} or less
        </button>
      ) : (
        <div className=\"w-full h-12 rounded-lg border border-border bg-muted flex items-center justify-center text-muted-foreground\">
          {batch.status === 'building' ? 'Batch opens soon' : `Batch ${batch.status}`}
        </div>
      )}
      
      {/* Batch Info */}
      <div className=\"mt-3 text-center text-xs text-muted-foreground\">
        {canJoin && (
          <>Your price is locked • Can only go down • Never up</>
        )}
        {batch.status === 'locked' && (
          <>Batch locked • Prep starts {formatTime(new Date(batch.prep_at))}</>
        )}
      </div>
    </div>
  )
}