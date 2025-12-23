interface PricePoint {
  time: string;
  price: number;
}

interface PriceChartProps {
  priceHistory: PricePoint[];
  currentPrice: number;
  priceChange: number;
  priceChangeDirection: "up" | "down" | "stable";
}

export function PriceChart({ priceHistory, currentPrice, priceChange, priceChangeDirection }: PriceChartProps) {
  const maxPrice = Math.max(...priceHistory.map(p => p.price), currentPrice);
  const minPrice = Math.min(...priceHistory.map(p => p.price), currentPrice);
  const range = maxPrice - minPrice || 1;

  const getYPosition = (price: number) => {
    return ((maxPrice - price) / range) * 60; // 60px height
  };

  const changeColor = priceChangeDirection === "up" ? "text-green-600" : 
                     priceChangeDirection === "down" ? "text-red-600" : "text-gray-600";
  const changeIcon = priceChangeDirection === "up" ? "▲" : 
                     priceChangeDirection === "down" ? "▼" : "●";

  return (
    <div className="mb-4">
      {/* Price and Change */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-2xl font-bold text-foreground">${currentPrice}</span>
          <span className={`ml-2 text-sm font-medium ${changeColor}`}>
            {changeIcon} ${Math.abs(priceChange)} in the last hour
          </span>
        </div>
      </div>

      {/* Mini Chart */}
      <div className="bg-background border border-border rounded-lg p-3 mb-2">
        <svg className="w-full h-16" viewBox="0 0 200 60" preserveAspectRatio="none">
          {/* Price Line */}
          <polyline
            fill="none"
            stroke="#00C896"
            strokeWidth="2"
            points={priceHistory.map((point, index) => {
              const x = (index / (priceHistory.length - 1)) * 180 + 10;
              const y = getYPosition(point.price) + 5;
              return `${x},${y}`;
            }).join(' ')}
          />
          
          {/* Data Points */}
          {priceHistory.map((point, index) => {
            const x = (index / (priceHistory.length - 1)) * 180 + 10;
            const y = getYPosition(point.price) + 5;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill="#00C896"
              />
            );
          })}
        </svg>
        
        {/* Time Labels */}
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          {priceHistory.map((point, index) => (
            <span key={index}>{point.time}</span>
          ))}
          <span className="font-medium">now</span>
        </div>
      </div>
    </div>
  );
}