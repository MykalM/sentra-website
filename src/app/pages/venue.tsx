import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CommitmentDiscountPricing } from "../components/commitment-discount-pricing";
import { GeolocationTracker } from "../components/geolocation-tracker";
import { EfficiencyPricing } from "../components/efficiency-pricing";
import { EfficiencyChart } from "../components/efficiency-chart";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  details: string;
  currentPrice: number; // This is now the lock-in price
  basePrice: number;    // This is now the regular price
  reservationFee: number;
  demandLevel: "High" | "Medium" | "Low";
  reservationCount: number;
  availableCount: number;
  imageUrl: string;
  category: string;
  regularPrice: number;    // Walk-in price (never changes)
  lockInPrice: number;     // Discounted price for planners
  discountPercentage: number;
  lockedCount: number;     // How many people locked in today
  prepTime: number;        // Minutes to prepare
  // Efficiency pricing fields
  currentVolume?: number;   // Orders in last hour
  efficiencyThreshold?: number; // Volume needed for max efficiency
  maxDiscount?: number;     // Maximum efficiency discount
  efficiencyHistory?: {
    time: string;
    volume: number;
    price: number;
    efficiencyDiscount: number;
  }[];
}

interface Venue {
  id: string;
  name: string;
  location: string;
  atmosphere: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
}

export function VenuePage() {
  const { venueId } = useParams<{ venueId: string }>();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [reservingItem, setReservingItem] = useState<string | null>(null);
  const [geoTracking, setGeoTracking] = useState<{
    item: MenuItem;
    code: string;
    finalPrice: number;
  } | null>(null);

  useEffect(() => {
    document.title = "Menu — Sentra";
  }, []);

  // Mock data - would come from API in production
  const venues: Record<string, Venue> = {
    "fusion-kitchen": {
      id: "fusion-kitchen",
      name: "Fusion Kitchen",
      location: "Hawthorne District, Portland",
      atmosphere: "Modern Asian fusion with creative cocktails",
      cuisine: "Asian Fusion",
      rating: 4.5,
      reviewCount: 298,
      imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop"
    },
    "escape-360": {
      id: "escape-360", 
      name: "Escape 360 Wine Bar",
      location: "Downtown Portland",
      atmosphere: "Intimate wine bar with rotating selections",
      cuisine: "Wine Bar",
      rating: 4.8,
      reviewCount: 324,
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop"
    },
    "blue-moon-coffee": {
      id: "blue-moon-coffee",
      name: "Blue Moon Coffee",
      location: "Alberta Arts District, Portland",
      atmosphere: "Cozy neighborhood coffee shop with artisan roasts",
      cuisine: "Coffee Shop",
      rating: 4.3,
      reviewCount: 445,
      imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=400&fit=crop"
    }
  };

  const menuItems: Record<string, MenuItem[]> = {
    "fusion-kitchen": [
      {
        id: "omakase",
        name: "Omakase Selection",
        description: "Chef's choice 8-course tasting menu",
        details: "Seasonal ingredients with Japanese technique and Korean flavors. Changes daily based on market availability.",
        currentPrice: 75,
        basePrice: 85,
        reservationFee: 10,
        demandLevel: "High",
        reservationCount: 15,
        availableCount: 4,
        imageUrl: "https://images.unsplash.com/photo-1579027989054-b11fd739e7d9?w=400&h=300&fit=crop",
        category: "Tasting Menu",
        regularPrice: 85,
        lockInPrice: 75,
        discountPercentage: 12,
        lockedCount: 8,
        prepTime: 90
      },
      {
        id: "wagyu-bowl",
        name: "A5 Wagyu Rice Bowl",
        description: "Premium wagyu beef over seasoned rice",
        details: "Authentic A5 wagyu from Japan, served over perfectly seasoned short grain rice with house-made sauces.",
        currentPrice: 42,
        basePrice: 48,
        reservationFee: 6,
        demandLevel: "High",
        reservationCount: 12,
        availableCount: 6,
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
        category: "Mains",
        regularPrice: 48,
        lockInPrice: 42,
        discountPercentage: 13,
        lockedCount: 12,
        prepTime: 15
      },
      {
        id: "ramen-special",
        name: "Tonkotsu Ramen Special",
        description: "Rich pork bone broth with handmade noodles",
        details: "20-hour slow-cooked tonkotsu broth with house-made noodles, chashu pork, and seasonal vegetables.",
        currentPrice: 19,
        basePrice: 22,
        reservationFee: 3,
        demandLevel: "Medium",
        reservationCount: 8,
        availableCount: 12,
        imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
        category: "Mains",
        regularPrice: 22,
        lockInPrice: 19,
        discountPercentage: 14,
        lockedCount: 6,
        prepTime: 12
      },
      {
        id: "sake-flight",
        name: "Premium Sake Flight",
        description: "Curated selection of 4 premium sakes",
        details: "Junmai, Ginjo, Daiginjo, and seasonal selection paired with tasting notes and guidance from our sake sommelier.",
        currentPrice: 24,
        basePrice: 28,
        reservationFee: 4,
        demandLevel: "Medium",
        reservationCount: 6,
        availableCount: 8,
        imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop",
        category: "Drinks",
        regularPrice: 28,
        lockInPrice: 24,
        discountPercentage: 14,
        lockedCount: 9,
        prepTime: 3
      },
      {
        id: "uni-toast",
        name: "Sea Urchin Toast",
        description: "Fresh uni on brioche with yuzu aioli",
        details: "Santa Barbara uni served on toasted brioche with yuzu aioli, micro greens, and black sesame.",
        currentPrice: 20,
        basePrice: 24,
        reservationFee: 4,
        demandLevel: "Low",
        reservationCount: 4,
        availableCount: 10,
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        category: "Appetizers",
        regularPrice: 24,
        lockInPrice: 20,
        discountPercentage: 17,
        lockedCount: 4,
        prepTime: 8
      },
      {
        id: "matcha-dessert",
        name: "Matcha Cheesecake",
        description: "Japanese-style cheesecake with matcha",
        details: "Light, airy cheesecake infused with ceremonial grade matcha, served with black sesame ice cream.",
        currentPrice: 11,
        basePrice: 14,
        reservationFee: 3,
        demandLevel: "Low",
        reservationCount: 3,
        availableCount: 15,
        imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
        category: "Desserts",
        regularPrice: 14,
        lockInPrice: 11,
        discountPercentage: 21,
        lockedCount: 5,
        prepTime: 5
      }
    ],
    "escape-360": [
      {
        id: "burgundy-chardonnay",
        name: "Burgundian Chardonnay",
        description: "2019 Domaine Leflaive Puligny-Montrachet",
        details: "Rich, mineral-driven white with notes of green apple, citrus, and subtle oak. Perfect with seafood.",
        currentPrice: 22,
        basePrice: 26,
        reservationFee: 4,
        demandLevel: "High",
        reservationCount: 12,
        availableCount: 8,
        imageUrl: "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400&h=300&fit=crop",
        category: "White Wine",
        regularPrice: 26,
        lockInPrice: 22,
        discountPercentage: 15,
        lockedCount: 14,
        prepTime: 2
      }
    ],
    "blue-moon-coffee": [
      {
        id: "oat-milk-flat-white",
        name: "Oat Milk Flat White",
        description: "House blend espresso with premium oat milk",
        details: "Our signature single-origin Ethiopian beans with perfectly steamed Oatly milk. Smooth, creamy, and sustainably sourced.",
        currentPrice: 5.50, // This is now the lock-in price
        basePrice: 6.50,    // This is now the regular walk-in price
        reservationFee: 1.00,
        demandLevel: "High",
        reservationCount: 12,
        availableCount: 8,
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
        category: "Coffee",
        regularPrice: 6.50,    // Walk-in price (never changes)
        lockInPrice: 5.50,     // Discounted price for planners
        discountPercentage: 15,
        lockedCount: 23,       // People who locked in today
        prepTime: 2,           // Minutes to prepare
        currentVolume: 18,     // Orders this hour
        efficiencyThreshold: 25, // Peak efficiency at 25+ orders/hour
        maxDiscount: 2.00,     // Up to $2 off from efficiency
        efficiencyHistory: [
          { time: "2pm", volume: 8, price: 6.10, efficiencyDiscount: 0.40 },
          { time: "3pm", volume: 12, price: 5.90, efficiencyDiscount: 0.60 },
          { time: "4pm", volume: 15, price: 5.70, efficiencyDiscount: 0.80 },
          { time: "5pm", volume: 18, price: 5.50, efficiencyDiscount: 1.00 },
          { time: "6pm", volume: 22, price: 5.20, efficiencyDiscount: 1.30 },
          { time: "7pm", volume: 18, price: 5.50, efficiencyDiscount: 1.00 }
        ]
      },
      {
        id: "lavender-honey-latte",
        name: "Lavender Honey Latte",
        description: "Espresso with lavender-infused honey syrup",
        details: "House-made lavender honey syrup with our signature espresso blend and steamed milk. A floral and sweet morning treat.",
        currentPrice: 5.00,
        basePrice: 6.00,
        reservationFee: 1.00,
        demandLevel: "Medium",
        reservationCount: 8,
        availableCount: 12,
        imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
        category: "Specialty Drinks",
        regularPrice: 6.00,
        lockInPrice: 5.00,
        discountPercentage: 17,
        lockedCount: 15,
        prepTime: 2,
        currentVolume: 12,
        efficiencyThreshold: 20,
        maxDiscount: 1.50,
        efficiencyHistory: [
          { time: "2pm", volume: 5, price: 5.80, efficiencyDiscount: 0.20 },
          { time: "3pm", volume: 8, price: 5.60, efficiencyDiscount: 0.40 },
          { time: "4pm", volume: 10, price: 5.40, efficiencyDiscount: 0.60 },
          { time: "5pm", volume: 12, price: 5.20, efficiencyDiscount: 0.80 },
          { time: "6pm", volume: 15, price: 4.90, efficiencyDiscount: 1.10 },
          { time: "7pm", volume: 12, price: 5.20, efficiencyDiscount: 0.80 }
        ]
      },
      {
        id: "avocado-toast",
        name: "Smashed Avocado Toast",
        description: "Sourdough with smashed avocado and everything seasoning",
        details: "Locally-baked sourdough with perfectly ripe avocado, everything bagel seasoning, red pepper flakes, and a drizzle of olive oil.",
        currentPrice: 9.50,
        basePrice: 11.00,
        reservationFee: 1.50,
        demandLevel: "Medium",
        reservationCount: 6,
        availableCount: 10,
        imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
        category: "Food",
        regularPrice: 11.00,
        lockInPrice: 9.50,
        discountPercentage: 14,
        lockedCount: 11,
        prepTime: 5,
        currentVolume: 6,
        efficiencyThreshold: 15,
        maxDiscount: 3.00,
        efficiencyHistory: [
          { time: "2pm", volume: 2, price: 10.60, efficiencyDiscount: 0.40 },
          { time: "3pm", volume: 4, price: 10.20, efficiencyDiscount: 0.80 },
          { time: "4pm", volume: 5, price: 10.00, efficiencyDiscount: 1.00 },
          { time: "5pm", volume: 6, price: 9.80, efficiencyDiscount: 1.20 },
          { time: "6pm", volume: 8, price: 9.40, efficiencyDiscount: 1.60 },
          { time: "7pm", volume: 6, price: 9.80, efficiencyDiscount: 1.20 }
        ]
      }
    ]
  };

  const venue = venues[venueId || "fusion-kitchen"];
  const items = menuItems[venueId || "fusion-kitchen"] || [];
  
  const categories = ["All", ...Array.from(new Set(items.map(item => item.category)))];
  
  const filteredItems = selectedCategory === "All" 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const getDemandColor = (level: string) => {
    switch (level) {
      case "High": return "text-red-600 bg-red-100";
      case "Medium": return "text-orange-600 bg-orange-100";
      case "Low": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const handleLockInItem = async (item: MenuItem) => {
    setReservingItem(item.id);
    // Simulate API call
    setTimeout(() => {
      setReservingItem(null);
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      const finalPrice = item.lockInPrice - item.reservationFee;
      
      setGeoTracking({
        item: {
          name: item.name,
          prepTime: item.prepTime
        },
        code,
        finalPrice
      });
    }, 2000);
  };

  if (!venue) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Venue not found</h1>
          <p className="text-muted-foreground">This venue doesn't exist or isn't available.</p>
        </div>
      </div>
    );
  }

  // Show geolocation tracker if item locked in
  if (geoTracking) {
    return (
      <GeolocationTracker
        item={geoTracking.item}
        lockFee={0}
        finalPrice={geoTracking.finalPrice}
        code={geoTracking.code}
        venueName={venue.name}
        venueAddress={venue.location}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative">
        {/* Hero Image */}
        <div className="h-48 md:h-64 relative">
          <img 
            src={venue.imageUrl}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Back Button */}
          <button 
            onClick={() => window.history.back()}
            className="absolute top-6 left-6 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Live Badge */}
          <div className="absolute top-6 right-6">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
              <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
              LIVE MENU
            </div>
          </div>
        </div>

        {/* Venue Info */}
        <div className="bg-card border-b border-border px-6 py-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-2">{venue.name}</h1>
            <p className="text-muted-foreground mb-3">{venue.location}</p>
            <p className="text-sm text-muted-foreground mb-4">{venue.atmosphere}</p>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                <span className="font-medium text-foreground">{venue.rating}</span>
                <span className="text-muted-foreground">({venue.reviewCount} reviews)</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{venue.cuisine}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Tonight's Menu</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid - Polymarket Style */}
        {/* Revolutionary Economics Notice */}
        {venueId === 'blue-moon-coffee' && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🚀</span>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Revolutionary Economics</h2>
                  <p className="text-sm text-muted-foreground">More people = Lower prices (opposite of surge pricing)</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                This coffee shop demonstrates economies of scale pricing. When more people order the same item, 
                batch efficiency improves and everyone pays less. Your insight about making popularity reduce prices 
                instead of increase them is genuinely revolutionary!
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                <p className="text-green-700 dark:text-green-300 text-sm font-medium">
                  ✅ Live efficiency pricing • ✅ Volume discounts • ✅ Geolocation prep timing
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              
              {/* Item Image */}
              <div className="aspect-[4/3] relative">
                <img 
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Demand Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDemandColor(item.demandLevel)}`}>
                    {item.demandLevel} Demand
                  </span>
                </div>
                
                {/* Availability Badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-card/90 backdrop-blur-sm text-foreground px-2 py-1 rounded-lg text-xs font-medium">
                    {item.availableCount} left
                  </span>
                </div>
              </div>

              {/* Item Content */}
              <div className="p-6">
                
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-foreground mb-2 leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    {item.description}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.details}
                  </p>
                </div>

                {/* Conditional Pricing Model */}
                {venue.cuisine === "Coffee Shop" && item.currentVolume !== undefined ? (
                  <>
                    <EfficiencyChart
                      itemName={item.name}
                      efficiencyHistory={item.efficiencyHistory || []}
                      basePrice={item.regularPrice}
                      maxDiscount={item.maxDiscount || 2}
                    />
                    <EfficiencyPricing
                      itemName={item.name}
                      basePrice={item.regularPrice}
                      currentVolume={item.currentVolume}
                      efficiencyThreshold={item.efficiencyThreshold || 25}
                      maxDiscount={item.maxDiscount || 2}
                      lockFee={item.reservationFee}
                      onLockIn={() => handleLockInItem(item)}
                      isLocking={reservingItem === item.id}
                    />
                  </>
                ) : (
                  <CommitmentDiscountPricing
                    itemName={item.name}
                    regularPrice={item.regularPrice}
                    lockInPrice={item.lockInPrice}
                    lockFee={item.reservationFee}
                    discountPercentage={item.discountPercentage}
                    lockedCount={item.lockedCount}
                    onLockIn={() => handleLockInItem(item)}
                    isLocking={reservingItem === item.id}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No items found in this category.</p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="text-primary hover:underline"
            >
              View all items
            </button>
          </div>
        )}
      </main>
    </div>
  );
}