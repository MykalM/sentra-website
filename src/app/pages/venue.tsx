import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
        category: "Tasting Menu"
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
        category: "Mains"
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
        category: "Mains"
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
        category: "Drinks"
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
        category: "Appetizers"
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
        category: "Desserts"
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
        category: "White Wine"
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

                {/* Pricing Section */}
                <div className="bg-background border border-border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tonight's Price</p>
                      <p className="text-2xl font-bold text-foreground">
                        ${item.currentPrice}
                        {item.currentPrice > item.basePrice && (
                          <span className="text-sm text-muted-foreground font-normal ml-2">
                            was ${item.basePrice}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Reserve for</p>
                      <p className="text-lg font-semibold text-primary">
                        ${item.reservationFee}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{item.reservationCount} reservations tonight</span>
                    <span>{item.availableCount} available</span>
                  </div>
                </div>

                {/* Reserve Button */}
                <button
                  onClick={() => handleReserveItem(item.id)}
                  disabled={reservingItem === item.id || item.availableCount === 0}
                  className="w-full bg-primary text-primary-foreground h-12 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
                >
                  {reservingItem === item.id ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Reserving...
                    </>
                  ) : item.availableCount === 0 ? (
                    "Sold Out"
                  ) : (
                    `Reserve ${item.name} — $${item.reservationFee}`
                  )}
                </button>
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