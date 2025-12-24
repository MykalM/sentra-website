interface EfficiencyChartProps {
  itemName: string;
  efficiencyHistory: {
    time: string;
    volume: number;
    price: number;
    efficiencyDiscount: number;
  }[];
  basePrice: number;
  maxDiscount: number;
}

export function EfficiencyChart({ 
  itemName, 
  efficiencyHistory, 
  basePrice,
  maxDiscount 
}: EfficiencyChartProps) {
  const maxVolume = Math.max(...efficiencyHistory.map(h => h.volume));
  const minPrice = Math.min(...efficiencyHistory.map(h => h.price));
  
  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium text-foreground">Efficiency Trend (Last 6 Hours)</h4>
        <div className="text-xs text-muted-foreground">
          Volume drives price down
        </div>
      </div>
      
      {/* Chart Container */}
      <div className="relative h-32 mb-4">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-t border-border/30 w-full" />
          ))}
        </div>
        
        {/* Price Line */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <polyline
            points={efficiencyHistory.map((point, index) => {
              const x = (index / (efficiencyHistory.length - 1)) * 100;
              const y = ((basePrice - point.price) / maxDiscount) * 100;
              return `${x},${100 - y}`;
            }).join(' ')}
            fill="none"
            stroke="rgb(59, 130, 246)"
            strokeWidth="2"
            className="drop-shadow-sm"
          />
          
          {/* Volume bars (background) */}
          {efficiencyHistory.map((point, index) => {
            const x = (index / (efficiencyHistory.length - 1)) * 100;
            const height = (point.volume / maxVolume) * 100;
            return (
              <rect
                key={index}
                x={`${x - 2}%`}
                y={`${100 - height}%`}
                width="4%"
                height={`${height}%`}
                fill="rgb(34, 197, 94)"
                opacity="0.2"
                className="transition-opacity hover:opacity-40"
              />
            );
          })}
        </svg>
        
        {/* Data Points */}
        <div className="absolute inset-0">
          {efficiencyHistory.map((point, index) => {
            const x = (index / (efficiencyHistory.length - 1)) * 100;
            const y = ((basePrice - point.price) / maxDiscount) * 100;
            return (
              <div
                key={index}
                className="absolute w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1 -translate-y-1 hover:scale-150 transition-transform"
                style={{ 
                  left: `${x}%`, 
                  top: `${100 - y}%` 
                }}
                title={`${point.time}: $${point.price} (${point.volume} orders)`}
              />
            );
          })}
        </div>
      </div>
      
      {/* Time Labels */}
      <div className="flex justify-between text-xs text-muted-foreground mb-2">
        {efficiencyHistory.map((point, index) => (
          <span key={index}>{point.time}</span>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-muted-foreground">Price</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500/40 rounded"></div>
            <span className="text-muted-foreground">Volume</span>
          </div>
        </div>
        
        <div className="text-muted-foreground">
          Current: ${efficiencyHistory[efficiencyHistory.length - 1]?.price.toFixed(2)}
        </div>
      </div>
      
      {/* Insight */}
      <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs text-blue-700 dark:text-blue-300">
        💡 When volume increases, our efficiency improves and prices drop automatically
      </div>
    </div>
  );
}