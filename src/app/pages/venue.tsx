import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PriceChart } from "../components/price-chart";
import { LockInPricing } from "../components/lock-in-pricing";
import { CoffeeShopModes } from "../components/coffee-shop-modes";
import { CoffeeConfirmation } from "../components/coffee-confirmation";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  details: string;
  currentPrice: number;
  basePrice: number;
  reservationFee: number;
  demandLevel: "High" | "Medium" | "Low";
  reservationCount: number;
  availableCount: number;
  imageUrl: string;
  category: string;
  priceHistory: Array<{ time: string; price: number }>;
  hourlyReservations: number;
  locksLeftAtPrice: number;
  peakPriceToday: number;
  priceChange: number;
  priceChangeDirection: "up" | "down" | "stable";
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
  const [coffeeConfirmation, setCoffeeConfirmation] = useState<{
    item: MenuItem;
    mode: 'skip-line' | 'lock-price';
    pickupTime?: string;
    code: string;
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
        currentPrice: 85,
        basePrice: 78,
        reservationFee: 10,
        demandLevel: "High",
        reservationCount: 15,
        availableCount: 4,
        imageUrl: "https://images.unsplash.com/photo-1579027989054-b11fd739e7d9?w=400&h=300&fit=crop",
        category: "Tasting Menu",
        priceHistory: [
          { time: "5pm", price: 78 },
          { time: "6pm", price: 80 },
          { time: "7pm", price: 82 },
          { time: "8pm", price: 85 },
        ],
        hourlyReservations: 8,
        locksLeftAtPrice: 2,
        peakPriceToday: 95,
        priceChange: 7,
        priceChangeDirection: "up"
      },
      {
        id: "wagyu-bowl",
        name: "A5 Wagyu Rice Bowl",
        description: "Premium wagyu beef over seasoned rice",
        details: "Authentic A5 wagyu from Japan, served over perfectly seasoned short grain rice with house-made sauces.",
        currentPrice: 48,
        basePrice: 45,
        reservationFee: 5,
        demandLevel: "High",
        reservationCount: 12,
        availableCount: 6,
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
        category: "Mains",
        priceHistory: [
          { time: "5pm", price: 45 },
          { time: "6pm", price: 46 },
          { time: "7pm", price: 47 },
          { time: "8pm", price: 48 },
        ],
        hourlyReservations: 12,
        locksLeftAtPrice: 3,
        peakPriceToday: 52,
        priceChange: 3,
        priceChangeDirection: "up"
      },
      {
        id: "ramen-special",
        name: "Tonkotsu Ramen Special",
        description: "Rich pork bone broth with handmade noodles",
        details: "20-hour slow-cooked tonkotsu broth with house-made noodles, chashu pork, and seasonal vegetables.",
        currentPrice: 22,
        basePrice: 20,
        reservationFee: 3,
        demandLevel: "Medium",
        reservationCount: 8,
        availableCount: 12,
        imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
        category: "Mains",
        priceHistory: [
          { time: "5pm", price: 20 },
          { time: "6pm", price: 21 },
          { time: "7pm", price: 22 },
          { time: "8pm", price: 22 },
        ],
        hourlyReservations: 8,
        locksLeftAtPrice: 6,
        peakPriceToday: 25,
        priceChange: 2,
        priceChangeDirection: "up"
      },
      {
        id: "sake-flight",
        name: "Premium Sake Flight",
        description: "Curated selection of 4 premium sakes",
        details: "Junmai, Ginjo, Daiginjo, and seasonal selection paired with tasting notes and guidance from our sake sommelier.",
        currentPrice: 28,
        basePrice: 26,
        reservationFee: 3,
        demandLevel: "Medium",
        reservationCount: 6,
        availableCount: 8,
        imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop",
        category: "Drinks",
        priceHistory: [{ time: "5pm", price: 26 }, { time: "6pm", price: 27 }, { time: "7pm", price: 28 }, { time: "8pm", price: 28 }],
        hourlyReservations: 6,
        locksLeftAtPrice: 4,
        peakPriceToday: 32,
        priceChange: 2,
        priceChangeDirection: "up"
      },
      {
        id: "uni-toast",
        name: "Sea Urchin Toast",
        description: "Fresh uni on brioche with yuzu aioli",
        details: "Santa Barbara uni served on toasted brioche with yuzu aioli, micro greens, and black sesame.",
        currentPrice: 24,
        basePrice: 22,
        reservationFee: 3,
        demandLevel: "Low",
        reservationCount: 4,
        availableCount: 10,
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        category: "Appetizers",
        priceHistory: [{ time: "5pm", price: 22 }, { time: "6pm", price: 22 }, { time: "7pm", price: 23 }, { time: "8pm", price: 24 }],
        hourlyReservations: 4,
        locksLeftAtPrice: 8,
        peakPriceToday: 26,
        priceChange: 2,
        priceChangeDirection: "up"
      },
      {
        id: "matcha-dessert",
        name: "Matcha Cheesecake",
        description: "Japanese-style cheesecake with matcha",
        details: "Light, airy cheesecake infused with ceremonial grade matcha, served with black sesame ice cream.",
        currentPrice: 14,
        basePrice: 12,
        reservationFee: 2,
        demandLevel: "Low",
        reservationCount: 3,
        availableCount: 15,
        imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
        category: "Desserts",
        priceHistory: [{ time: "5pm", price: 12 }, { time: "6pm", price: 12 }, { time: "7pm", price: 13 }, { time: "8pm", price: 14 }],
        hourlyReservations: 3,
        locksLeftAtPrice: 12,
        peakPriceToday: 16,
        priceChange: 2,
        priceChangeDirection: "up"
      }
    ],
    "escape-360": [
      {
        id: "burgundy-chardonnay",
        name: "Burgundian Chardonnay",
        description: "2019 Domaine Leflaive Puligny-Montrachet",
        details: "Rich, mineral-driven white with notes of green apple, citrus, and subtle oak. Perfect with seafood.",
        currentPrice: 24,
        basePrice: 22,
        reservationFee: 2,
        demandLevel: "High",
        reservationCount: 12,
        availableCount: 8,
        imageUrl: "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400&h=300&fit=crop",
        category: "White Wine",
        priceHistory: [
          { time: "7pm", price: 22 },
          { time: "8pm", price: 23 },
          { time: "9pm", price: 24 },
          { time: "now", price: 24 },
        ],
        hourlyReservations: 12,
        locksLeftAtPrice: 4,
        peakPriceToday: 28,
        priceChange: 2,
        priceChangeDirection: "up"
      }
    ],
    "blue-moon-coffee": [
      {
        id: "oat-milk-flat-white",
        name: "Oat Milk Flat White",
        description: "House blend espresso with premium oat milk",
        details: "Our signature single-origin Ethiopian beans with perfectly steamed Oatly milk. Smooth, creamy, and sustainably sourced.",
        currentPrice: 6.80,
        basePrice: 6.50,
        reservationFee: 1.00,
        demandLevel: "High",
        reservationCount: 12,
        availableCount: 8,
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
        category: "Coffee",
        priceHistory: [
          { time: "7am", price: 6.50 },
          { time: "8am", price: 6.80 },
          { time: "9am", price: 6.80 },
          { time: "now", price: 6.80 },
        ],
        hourlyReservations: 12,
        locksLeftAtPrice: 3,
        peakPriceToday: 7.50,
        priceChange: 0.30,
        priceChangeDirection: "up"
      },
      {
        id: "lavender-honey-latte",
        name: "Lavender Honey Latte",
        description: "Espresso with lavender-infused honey syrup",
        details: "House-made lavender honey syrup with our signature espresso blend and steamed milk. A floral and sweet morning treat.",
        currentPrice: 6.00,
        basePrice: 5.50,
        reservationFee: 1.00,
        demandLevel: "Medium",
        reservationCount: 8,
        availableCount: 12,
        imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
        category: "Specialty Drinks",
        priceHistory: [
          { time: "7am", price: 5.50 },
          { time: "8am", price: 5.75 },
          { time: "9am", price: 6.00 },
          { time: "now", price: 6.00 },
        ],
        hourlyReservations: 8,
        locksLeftAtPrice: 5,
        peakPriceToday: 6.75,
        priceChange: 0.50,
        priceChangeDirection: "up"
      },
      {
        id: "avocado-toast",
        name: "Smashed Avocado Toast",
        description: "Sourdough with smashed avocado and everything seasoning",
        details: "Locally-baked sourdough with perfectly ripe avocado, everything bagel seasoning, red pepper flakes, and a drizzle of olive oil.",
        currentPrice: 11.00,
        basePrice: 10.00,
        reservationFee: 1.50,
        demandLevel: "Medium",
        reservationCount: 6,
        availableCount: 10,
        imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
        category: "Food",
        priceHistory: [
          { time: "7am", price: 10.00 },
          { time: "8am", price: 10.50 },
          { time: "9am", price: 11.00 },
          { time: "now", price: 11.00 },
        ],
        hourlyReservations: 6,
        locksLeftAtPrice: 7,
        peakPriceToday: 12.50,
        priceChange: 1.00,
        priceChangeDirection: "up"
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

  const handleReserveItem = async (itemId: string) => {
    setReservingItem(itemId);
    // Simulate API call
    setTimeout(() => {
      setReservingItem(null);
      // In real app, would navigate to reservation confirmation
      alert("Reservation successful! Code: ABC123");
    }, 2000);
  };

  const handleCoffeeSkipLine = async (item: MenuItem, pickupTime: string) => {
    setReservingItem(item.id);
    // Simulate API call
    setTimeout(() => {
      setReservingItem(null);
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      setCoffeeConfirmation({
        item,
        mode: 'skip-line',
        pickupTime,
        code
      });
    }, 2000);
  };

  const handleCoffeeLockPrice = async (item: MenuItem) => {
    setReservingItem(item.id);
    // Simulate API call
    setTimeout(() => {
      setReservingItem(null);
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      setCoffeeConfirmation({
        item,
        mode: 'lock-price',
        code
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

  // Show coffee confirmation if exists
  if (coffeeConfirmation) {
    return (
      <CoffeeConfirmation
        item={coffeeConfirmation.item}
        mode={coffeeConfirmation.mode}
        pickupTime={coffeeConfirmation.pickupTime}
        code={coffeeConfirmation.code}
        venueName={venue.name}
      />
    );
  }

  const isCoffeeShop = venue.cuisine === "Coffee Shop";

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

                {/* Conditional Pricing Interface */}
                {isCoffeeShop ? (
                  <CoffeeShopModes
                    item={{
                      name: item.name,
                      currentPrice: item.currentPrice,
                      reservationFee: item.reservationFee,
                      peakPriceToday: item.peakPriceToday,
                      priceChange: item.priceChange
                    }}
                    onSkipLine={(pickupTime) => handleCoffeeSkipLine(item, pickupTime)}
                    onLockPrice={() => handleCoffeeLockPrice(item)}
                    isProcessing={reservingItem === item.id}
                  />
                ) : (
                  <>
                    {/* Price Chart */}
                    <PriceChart 
                      priceHistory={item.priceHistory}
                      currentPrice={item.currentPrice}
                      priceChange={item.priceChange}
                      priceChangeDirection={item.priceChangeDirection}
                    />

                    {/* Lock In Pricing */}
                    <LockInPricing
                      currentPrice={item.currentPrice}
                      reservationFee={item.reservationFee}
                      peakPriceToday={item.peakPriceToday}
                      hourlyReservations={item.hourlyReservations}
                      locksLeftAtPrice={item.locksLeftAtPrice}
                      itemName={item.name}
                      onLockIn={() => handleReserveItem(item.id)}
                      isLocking={reservingItem === item.id}
                    />
                  </>
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