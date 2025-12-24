'use client'

import { useState, useEffect } from 'react'
import { formatPrice, formatTime, formatDateTime } from '../utils/format'

interface BatchTier {
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

interface Reservation {
  id: string
  item_id: string
  locked_price: number
  final_price?: number
  lock_fee: number
  redeem_code: string
  status: 'pending' | 'active' | 'prep_triggered' | 'ready' | 'redeemed'
  created_at: string
  guest_eta_minutes?: number
  vibe?: string
}

interface Batch {
  id: string
  starts_at: string
  ends_at: string
  prep_at: string
  status: 'building' | 'locked' | 'prepping' | 'ready' | 'complete'
  reservations: (Reservation & { item: BatchItem })[]
}

interface OperatorBatchDashboardProps {
  venueName: string
  batches: Batch[]
  onRedeemCode: (code: string) => void
  onMarkPrepping: (batchId: string) => void
  onMarkReady: (batchId: string) => void
}

export function OperatorBatchDashboard({
  venueName,
  batches,
  onRedeemCode,
  onMarkPrepping,
  onMarkReady
}: OperatorBatchDashboardProps) {
  const [redeemCode, setRedeemCode] = useState('')
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  
  // Sort batches by time
  const sortedBatches = [...batches].sort(
    (a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime()
  )
  
  // Get today's stats
  const totalReservations = batches.flatMap(b => b.reservations).length
  const activeReservations = batches.flatMap(b => b.reservations).filter(r => 
    ['active', 'prep_triggered', 'ready'].includes(r.status)
  ).length
  const redeemedToday = batches.flatMap(b => b.reservations).filter(r => 
    r.status === 'redeemed'
  ).length
  const totalRevenue = batches.flatMap(b => b.reservations)
    .filter(r => r.status === 'redeemed')
    .reduce((sum, r) => sum + (r.final_price || r.locked_price) - r.lock_fee, 0)
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'building': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'locked': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'prepping': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'ready': return 'bg-green-100 text-green-800 border-green-200'
      case 'complete': return 'bg-gray-100 text-gray-600 border-gray-200'
      default: return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'building': return 'Accepting locks'
      case 'locked': return 'Batch locked'
      case 'prepping': return 'Prepping orders'
      case 'ready': return 'Ready for pickup'
      case 'complete': return 'Complete'
      default: return status
    }
  }
  
  const handleRedeemSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (redeemCode.trim()) {
      onRedeemCode(redeemCode.trim().toUpperCase())
      setRedeemCode('')
    }
  }
  
  // Get urgent items (guests nearby)
  const urgentOrders = batches.flatMap(b => 
    b.reservations.filter(r => 
      r.status === 'prep_triggered' || 
      (r.status === 'active' && r.guest_eta_minutes && r.guest_eta_minutes <= 5)
    )
  )
  
  return (
    <div className="min-h-screen bg-background">
      
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{venueName}</h1>
            <p className="text-sm text-muted-foreground">
              Operator Dashboard • {formatDateTime(currentTime)}
            </p>
          </div>
          
          {/* Quick Redeem */}
          <form onSubmit={handleRedeemSubmit} className="flex gap-2">
            <input
              type="text"
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value)}
              placeholder="Enter pickup code"
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
              maxLength={6}
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Redeem
            </button>
          </form>
        </div>
      </header>
      
      <div className="max-w-6xl mx-auto px-6 py-6">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-bold text-foreground">{totalReservations}</div>
            <div className="text-sm text-muted-foreground">Total locks today</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-bold text-orange-600">{activeReservations}</div>
            <div className="text-sm text-muted-foreground">Active orders</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-bold text-green-600">{redeemedToday}</div>
            <div className="text-sm text-muted-foreground">Completed today</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">${formatPrice(totalRevenue)}</div>
            <div className="text-sm text-muted-foreground">Revenue today</div>
          </div>
        </div>
        
        {/* Urgent Orders Alert */}
        {urgentOrders.length > 0 && (
          <div className="mb-8">
            <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <h2 className="text-xl font-bold text-orange-700 dark:text-orange-300">
                  🔔 PREP NOW ({urgentOrders.length} orders)
                </h2>
              </div>
              <div className="grid gap-3">
                {urgentOrders.map(order => (
                  <div key={order.id} className="bg-white dark:bg-gray-800 border border-orange-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="font-mono text-lg font-bold text-primary">
                        {order.redeem_code}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{order.item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.guest_eta_minutes ? `${order.guest_eta_minutes} min ETA` : 'Guest nearby'}
                          {order.vibe && ` • ${order.vibe}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">
                        ${formatPrice((order.final_price || order.locked_price) - order.lock_fee)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        prep: {order.item.prep_time_minutes}m
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Batch Queue */}
        <div className="grid lg:grid-cols-2 gap-6">
          {sortedBatches.map((batch) => {
            const activeRes = batch.reservations.filter(r => 
              ['active', 'prep_triggered', 'ready'].includes(r.status)
            )
            
            // Group by item
            const itemCounts = activeRes.reduce((acc, r) => {
              const itemName = r.item.name
              acc[itemName] = (acc[itemName] || 0) + 1
              return acc
            }, {} as Record<string, number>)
            
            const nearbyCount = batch.reservations.filter(r => 
              r.status === 'prep_triggered' || (r.guest_eta_minutes && r.guest_eta_minutes <= 5)
            ).length
            
            const isSelected = selectedBatch === batch.id
            
            return (
              <div 
                key={batch.id} 
                className={`bg-card border rounded-xl p-6 transition-all cursor-pointer ${
                  isSelected ? 'border-primary shadow-md' : 'border-border hover:shadow-sm'
                }`}
                onClick={() => setSelectedBatch(isSelected ? null : batch.id)}
              >
                
                {/* Batch Header */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        {formatTime(new Date(batch.starts_at))} - {formatTime(new Date(batch.ends_at))}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(batch.status)}`}>
                        {getStatusLabel(batch.status)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Prep starts: {formatTime(new Date(batch.prep_at))}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">{activeRes.length}</div>
                    <div className="text-xs text-muted-foreground">orders</div>
                  </div>
                </div>
                
                {/* Item Breakdown */}
                {Object.keys(itemCounts).length > 0 && (
                  <div className="space-y-2 mb-4">
                    {Object.entries(itemCounts).map(([item, count]) => (
                      <div key={item} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item}</span>
                        <span className="font-medium text-foreground">{count}x</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Nearby Alert */}
                {nearbyCount > 0 && (
                  <div className="bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-lg p-3 mb-4">
                    <p className="text-orange-700 dark:text-orange-300 text-sm font-medium text-center">
                      🔔 {nearbyCount} {nearbyCount === 1 ? 'guest' : 'guests'} nearby
                    </p>
                  </div>
                )}
                
                {/* Action Buttons */}
                {batch.status === 'locked' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onMarkPrepping(batch.id)
                    }}
                    className="w-full bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                  >
                    Start Prepping
                  </button>
                )}
                
                {batch.status === 'prepping' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onMarkReady(batch.id)
                    }}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Mark Ready
                  </button>
                )}
                
                {/* Expanded Details */}
                {isSelected && activeRes.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <h4 className="font-medium text-foreground mb-3">Order Details</h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {activeRes.map(res => (
                        <div key={res.id} className="flex justify-between items-center p-3 bg-background rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="font-mono text-sm font-bold text-primary">
                              {res.redeem_code}
                            </div>
                            <div>
                              <div className="font-medium text-foreground text-sm">{res.item.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {res.guest_eta_minutes && `${res.guest_eta_minutes}m ETA • `}
                                {res.vibe && `${res.vibe} • `}
                                {formatTime(new Date(res.created_at))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-foreground text-sm">
                              ${formatPrice((res.final_price || res.locked_price) - res.lock_fee)}
                            </div>
                            <div className={`text-xs px-2 py-1 rounded-full ${
                              res.status === 'prep_triggered' ? 'bg-orange-100 text-orange-700' :
                              res.status === 'ready' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {res.status.replace('_', ' ')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        {sortedBatches.length === 0 && (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-foreground mb-2">No batches today</h3>
            <p className="text-muted-foreground">
              Batches will appear here as customers start locking in orders.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}