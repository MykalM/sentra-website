'use client'

import { useState, useEffect } from 'react'
import { formatPrice, formatTime } from '../utils/format'

interface BatchTier {
  min_count: number
  price: number
}

interface Reservation {
  id: string
  batch_id: string
  item_id: string
  locked_price: number
  final_price?: number
  lock_fee: number
  redeem_code: string
  status: 'pending' | 'active' | 'prep_triggered' | 'ready' | 'redeemed'
  created_at: string
}

interface BatchItem {
  name: string
  description: string
  base_price: number
  batch_tiers: BatchTier[]
  prep_time_minutes: number
}

interface Batch {
  starts_at: string
  ends_at: string
  prep_at: string
  status: string
}

interface BatchConfirmationProps {
  reservation: Reservation
  batch: Batch
  item: BatchItem
  currentCount: number
  venueName: string
  venueSlug: string
}

export function BatchConfirmation({
  reservation,
  batch,
  item,
  currentCount,
  venueName,
  venueSlug
}: BatchConfirmationProps) {
  const [liveCount, setLiveCount] = useState(currentCount)
  const [shareSuccess, setShareSuccess] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  
  // Calculate current pricing
  const sortedTiers = [...item.batch_tiers].sort((a, b) => a.min_count - b.min_count)
  const getNextTier = () => {
    return sortedTiers.find(tier => tier.min_count > liveCount)
  }
  
  const currentPrice = reservation.final_price || reservation.locked_price
  const finalPrice = currentPrice - reservation.lock_fee
  const totalSavings = item.base_price - currentPrice + reservation.lock_fee
  const nextTier = getNextTier()
  const peopleNeeded = nextTier ? nextTier.min_count - liveCount : 0
  
  // Generate share content
  const shareUrl = `${window.location.origin}/${venueSlug}?batch=${reservation.batch_id}&highlight=${reservation.item_id}`
  const shareText = nextTier && peopleNeeded > 0
    ? `I just locked in ${item.name} at ${venueName}! ${peopleNeeded} more people and we ALL pay $${formatPrice(nextTier.price)} instead of $${formatPrice(currentPrice)} 🎉`
    : `Just locked in ${item.name} at ${venueName} for $${formatPrice(finalPrice)}! Way better than the $${formatPrice(item.base_price)} walk-in price 🔥`
  
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my batch!',
          text: shareText,
          url: shareUrl
        })
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 3000)
      } catch (err) {
        console.log('Share cancelled or failed')
      }
    } else {
      handleCopyLink()
    }
  }
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\\n\\n${shareUrl}`)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 3000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }
  
  const getStatusIcon = () => {
    switch (reservation.status) {
      case 'active': return '🔒'
      case 'prep_triggered': return '👨‍🍳'
      case 'ready': return '✅'
      case 'redeemed': return '🎉'
      default: return '⏳'
    }
  }
  
  const getStatusMessage = () => {
    switch (reservation.status) {
      case 'active': 
        return `Your price is locked! We'll start prep when you're ${item.prep_time_minutes + 2} min away.`
      case 'prep_triggered':
        return `We're making your ${item.name} now! Almost ready.`
      case 'ready':
        return `Your ${item.name} is ready for pickup!`
      case 'redeemed':
        return `Order complete! Thanks for using Sentra.`
      default:
        return 'Processing your lock...'
    }
  }
  
  return (
    <div className=\"max-w-md mx-auto px-4 py-6\">
      
      {/* Success Header */}
      <div className=\"text-center mb-6\">
        <div className=\"text-4xl mb-3\">{getStatusIcon()}</div>
        <h1 className=\"text-2xl font-bold text-foreground mb-2\">
          {reservation.status === 'active' ? 'Locked in!' : 'Order Update'}
        </h1>
        <p className=\"text-muted-foreground\">
          {getStatusMessage()}
        </p>
      </div>
      
      {/* Order Card */}
      <div className=\"bg-card border border-border rounded-xl p-6 shadow-sm mb-6\">
        <h2 className=\"font-semibold text-foreground text-lg mb-1\">{item.name}</h2>
        <p className=\"text-sm text-muted-foreground mb-4\">
          {formatTime(new Date(batch.starts_at))} - {formatTime(new Date(batch.ends_at))} batch at {venueName}
        </p>
        
        {/* Live Batch Stats */}
        <div className=\"bg-background rounded-xl p-4 mb-4\">
          <div className=\"flex justify-between items-center mb-2\">
            <span className=\"text-sm text-muted-foreground\">People in batch</span>
            <div className=\"flex items-center gap-2\">
              <span className=\"font-medium text-foreground\">{liveCount}</span>
              <div className=\"w-2 h-2 bg-green-500 rounded-full animate-pulse\"></div>
            </div>
          </div>
          
          <div className=\"flex justify-between items-center mb-2\">
            <span className=\"text-sm text-muted-foreground\">Your locked price</span>
            <span className=\"font-medium text-foreground\">${formatPrice(reservation.locked_price)}</span>
          </div>
          
          {reservation.final_price && reservation.final_price < reservation.locked_price && (
            <div className=\"flex justify-between items-center text-green-600 mb-2\">
              <span className=\"text-sm\">Current batch price ↓</span>
              <span className=\"font-medium\">${formatPrice(reservation.final_price)}</span>
            </div>
          )}
          
          <div className=\"flex justify-between items-center\">
            <span className=\"text-sm text-muted-foreground\">Walk-in price</span>
            <span className=\"text-muted-foreground line-through\">${formatPrice(item.base_price)}</span>
          </div>
          
          {nextTier && peopleNeeded > 0 && (
            <div className=\"mt-3 pt-3 border-t border-border\">
              <div className=\"bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3\">
                <div className=\"text-blue-700 dark:text-blue-300 text-sm text-center\">
                  <div className=\"font-medium\">
                    🎉 {peopleNeeded} more {peopleNeeded === 1 ? 'person' : 'people'} and everyone pays ${formatPrice(nextTier.price)}!
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Final Price Breakdown */}
        <div className=\"space-y-2 mb-4\">
          <div className=\"flex justify-between\">
            <span className=\"text-muted-foreground\">Batch price</span>
            <span className=\"text-foreground\">${formatPrice(currentPrice)}</span>
          </div>
          <div className=\"flex justify-between\">
            <span className=\"text-muted-foreground\">Your lock fee credit</span>
            <span className=\"text-foreground\">-${formatPrice(reservation.lock_fee)}</span>
          </div>
          <div className=\"flex justify-between pt-2 border-t border-border font-medium\">
            <span className=\"text-foreground\">You pay at pickup</span>
            <span className=\"text-foreground\">${formatPrice(finalPrice)}</span>
          </div>
        </div>
        
        <div className=\"bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-center\">
          <p className=\"text-green-700 dark:text-green-300 text-sm font-medium\">
            Saving ${formatPrice(totalSavings)} vs walk-in price
          </p>
        </div>
      </div>
      
      {/* Redeem Code */}
      <div className=\"bg-foreground rounded-xl p-6 text-center mb-6\">
        <p className=\"text-xs text-muted uppercase tracking-wide mb-2\">
          Your pickup code
        </p>
        <p className=\"text-4xl font-mono text-background tracking-widest font-bold\">
          {reservation.redeem_code}
        </p>
        <p className=\"text-sm text-muted mt-3\">
          Show this at pickup
        </p>
      </div>
      
      {/* Share Section - Only show if there's a next tier to unlock */}
      {nextTier && peopleNeeded > 0 && (
        <div className=\"bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6\">
          <div className=\"text-center mb-4\">
            <h3 className=\"font-semibold text-foreground mb-2\">
              🚀 Help unlock the next tier!
            </h3>
            <p className=\"text-sm text-muted-foreground\">
              Share this batch with {peopleNeeded} {peopleNeeded === 1 ? 'friend' : 'friends'} and everyone saves an extra $
              {formatPrice(currentPrice - nextTier.price)}
            </p>
          </div>
          
          <div className=\"grid grid-cols-1 gap-3\">
            <button
              onClick={handleNativeShare}
              className=\"w-full bg-primary text-primary-foreground h-11 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2\"
            >
              {shareSuccess ? (
                <>
                  <span>✓</span>
                  <span>Shared!</span>
                </>
              ) : (
                <>
                  <span>📤</span>
                  <span>Share batch link</span>
                </>
              )}
            </button>
            
            <button
              onClick={handleCopyLink}
              className=\"w-full bg-background border border-border text-foreground h-11 rounded-lg font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2\"
            >
              {copySuccess ? (
                <>
                  <span>✓</span>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <span>📋</span>
                  <span>Copy link</span>
                </>
              )}
            </button>
          </div>
          
          <div className=\"mt-4 text-center\">
            <p className=\"text-xs text-muted-foreground\">
              💡 The more friends join, the less everyone pays. It's a win-win!
            </p>
          </div>
        </div>
      )}
      
      {/* Status Timeline */}
      <div className=\"bg-card border border-border rounded-xl p-6 shadow-sm mb-6\">
        <h3 className=\"font-medium text-foreground mb-4\">Order timeline</h3>
        
        <div className=\"space-y-4\">
          {[
            { id: 'locked', label: 'Locked in', description: 'Price secured', status: 'complete' },
            { 
              id: 'prep', 
              label: 'Prep starts', 
              description: `When you're ${item.prep_time_minutes + 2} min away`,
              status: reservation.status === 'prep_triggered' ? 'current' : reservation.status === 'ready' || reservation.status === 'redeemed' ? 'complete' : 'pending'
            },
            { 
              id: 'ready', 
              label: 'Ready for pickup', 
              description: 'Perfect timing on arrival',
              status: reservation.status === 'ready' ? 'current' : reservation.status === 'redeemed' ? 'complete' : 'pending'
            },
            { 
              id: 'complete', 
              label: 'Completed', 
              description: 'Enjoy!',
              status: reservation.status === 'redeemed' ? 'complete' : 'pending'
            },
          ].map((step, index) => {
            const isComplete = step.status === 'complete'
            const isCurrent = step.status === 'current'
            
            return (
              <div key={step.id} className=\"flex gap-3\">
                <div className=\"flex flex-col items-center\">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                    isComplete 
                      ? 'bg-green-500 text-white' 
                      : isCurrent 
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {isComplete ? '✓' : index + 1}
                  </div>
                  {index < 3 && (
                    <div className={`w-0.5 h-8 ${
                      isComplete ? 'bg-green-500' : 'bg-muted'
                    }`} />
                  )}
                </div>
                <div className=\"flex-1\">
                  <p className={`font-medium ${
                    isComplete || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </p>
                  <p className=\"text-sm text-muted-foreground\">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Back to venue */}
      <button 
        onClick={() => window.location.href = `/${venueSlug}`}
        className=\"w-full border border-border text-foreground h-11 rounded-lg font-medium hover:bg-muted transition-colors\"
      >
        Back to {venueName}
      </button>
    </div>
  )
}