import { useState, useEffect } from "react";

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  neighborhood: string;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  rating: number;
  reviewCount: number;
  featuredItem: {
    name: string;
    currentPrice: number;
    basePrice: number;
    demandLevel: "Low" | "Medium" | "High";
    reservationCount: number;
  };
  openNow: boolean;
  distance: string;
  imageUrl: string;
  hasActiveDemand: boolean;
}

export function DiscoverPage() {
  const [location, setLocation] = useState("Portland, OR");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [sortBy, setSortBy] = useState("demand");
  
  useEffect(() => {
    document.title = "Discover Restaurants — Sentra";
  }, []);

  // Mock restaurant data - in production this would come from your backend
  const restaurants: Restaurant[] = [
    {
      id: "escape-360",
      name: "Escape 360 Wine Bar",
      cuisine: "Wine Bar",
      neighborhood: "Downtown",
      priceRange: "$$$",
      rating: 4.8,
      reviewCount: 324,
      featuredItem: {
        name: "Burgundian Chardonnay",
        currentPrice: 24,
        basePrice: 22,
        demandLevel: "High",
        reservationCount: 12
      },
      openNow: true,
      distance: "0.3 mi",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      hasActiveDemand: true
    },
    {
      id: "portland-oyster",
      name: "Portland Oyster House",
      cuisine: "Seafood",
      neighborhood: "Pearl District",
      priceRange: "$$$$",
      rating: 4.6,
      reviewCount: 189,
      featuredItem: {
        name: "Kumamoto Oysters",
        currentPrice: 18,
        basePrice: 16,
        demandLevel: "Medium",
        reservationCount: 7
      },
      openNow: true,
      distance: "0.8 mi",
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
      hasActiveDemand: true
    },
    {
      id: "river-commons",
      name: "River Commons Brewery",
      cuisine: "American",
      neighborhood: "Southeast",
      priceRange: "$$",
      rating: 4.4,
      reviewCount: 512,
      featuredItem: {
        name: "IPA Flight",
        currentPrice: 12,
        basePrice: 12,
        demandLevel: "Low",
        reservationCount: 3
      },
      openNow: true,
      distance: "1.2 mi",
      imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      hasActiveDemand: false
    },
    {
      id: "fusion-kitchen",
      name: "Fusion Kitchen",
      cuisine: "Asian Fusion",
      neighborhood: "Hawthorne",
      priceRange: "$$",
      rating: 4.5,
      reviewCount: 298,
      featuredItem: {
        name: "Omakase Selection",
        currentPrice: 35,
        basePrice: 32,
        demandLevel: "High",
        reservationCount: 15
      },
      openNow: false,
      distance: "2.1 mi",
      imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
      hasActiveDemand: true
    },
    {
      id: "blue-moon-coffee",
      name: "Blue Moon Coffee",
      cuisine: "Coffee",
      neighborhood: "Alberta",
      priceRange: "$",
      rating: 4.3,
      reviewCount: 445,
      featuredItem: {
        name: "Lavender Honey Latte",
        currentPrice: 6,
        basePrice: 5.50,
        demandLevel: "Medium",
        reservationCount: 8
      },
      openNow: true,
      distance: "0.5 mi",
      imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
      hasActiveDemand: true
    },
    {
      id: "corner-bistro",
      name: "Corner Bistro",
      cuisine: "French",
      neighborhood: "Northwest",
      priceRange: "$$$",
      rating: 4.7,
      reviewCount: 267,
      featuredItem: {
        name: "Duck Confit",
        currentPrice: 28,
        basePrice: 26,
        demandLevel: "High",
        reservationCount: 11
      },
      openNow: true,
      distance: "1.1 mi",
      imageUrl: "https://images.unsplash.com/photo-1555992828-4b875ea4b213?w=400&h=300&fit=crop",
      hasActiveDemand: true
    },
    {
      id: "taco-libre",
      name: "Taco Libre",
      cuisine: "Mexican",
      neighborhood: "Division",
      priceRange: "$",
      rating: 4.2,
      reviewCount: 678,
      featuredItem: {
        name: "Carnitas Tacos",
        currentPrice: 4.50,
        basePrice: 4,
        demandLevel: "Medium",
        reservationCount: 6
      },
      openNow: true,
      distance: "0.7 mi",
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      hasActiveDemand: true
    },
    {
      id: "sunrise-bagels",
      name: "Sunrise Bagels",
      cuisine: "Breakfast",
      neighborhood: "Burnside",
      priceRange: "$",
      rating: 4.0,
      reviewCount: 523,
      featuredItem: {
        name: "Everything Bagel with Lox",
        currentPrice: 12,
        basePrice: 11,
        demandLevel: "Low",
        reservationCount: 4
      },
      openNow: true,
      distance: "1.5 mi",
      imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
      hasActiveDemand: true
    },
    {
      id: "noodle-house",
      name: "Golden Noodle House",
      cuisine: "Asian",
      neighborhood: "Southeast",
      priceRange: "$$",
      rating: 4.1,
      reviewCount: 356,
      featuredItem: {
        name: "Dan Dan Noodles",
        currentPrice: 14,
        basePrice: 13,
        demandLevel: "Medium",
        reservationCount: 9
      },
      openNow: true,
      distance: "1.8 mi",
      imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
      hasActiveDemand: true
    }
  ];

  const cuisines = ["All", "Coffee", "Breakfast", "Mexican", "Asian", "French", "Wine Bar", "Seafood", "American", "Asian Fusion"];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = selectedCuisine === "All" || restaurant.cuisine === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === "demand") {
      if (a.hasActiveDemand && !b.hasActiveDemand) return -1;
      if (!a.hasActiveDemand && b.hasActiveDemand) return 1;
      return b.featuredItem.reservationCount - a.featuredItem.reservationCount;
    }
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "distance") return parseFloat(a.distance) - parseFloat(b.distance);
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground text-lg font-semibold">S</span>
              </div>
              <h3 className="text-xl text-foreground font-semibold tracking-tight">Sentra</h3>
            </a>
            
            <div className="flex items-center gap-4">
              <a href="/login" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                Sign In
              </a>
              <a href="/signup" className="bg-primary text-primary-foreground text-sm font-medium h-9 px-4 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Uber Eats Style Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            Food delivery in {location}
          </h1>
          
          {/* Search Bar - Uber Eats Style */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-10 pr-4 text-foreground bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Search for restaurant or cuisine"
            />
          </div>

          {/* Filter Chips - Uber Eats Style */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            <button 
              onClick={() => setSortBy("demand")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                sortBy === "demand" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              🔥 Live Demand
            </button>
            <button 
              onClick={() => setSortBy("rating")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                sortBy === "rating" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              ⭐ Top Rated
            </button>
            <button 
              onClick={() => setSortBy("distance")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                sortBy === "distance" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              📍 Nearby
            </button>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="px-4 py-2 rounded-full text-sm font-medium bg-card border border-border text-foreground hover:bg-muted appearance-none"
            >
              {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {sortedRestaurants.length} restaurants near {location}
            </h2>
            <p className="text-sm text-muted-foreground">
              {sortedRestaurants.filter(r => r.hasActiveDemand).length} with active demand signals
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Live data</span>
          </div>
        </div>

        {/* Restaurant Grid - Uber Eats Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        {/* Empty State */}
        {sortedRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No restaurants found matching your search.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCuisine("All");
              }}
              className="text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const getDemandColor = (level: string) => {
    switch (level) {
      case "High": return "text-red-600 bg-red-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "Low": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      {/* Restaurant Image - Uber Eats Style */}
      <div className="aspect-[4/3] relative">
        <img 
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        
        {/* Live Badge */}
        {restaurant.hasActiveDemand && (
          <div className="absolute top-3 left-3">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse"></div>
              LIVE DEMAND
            </div>
          </div>
        )}

        {/* Distance Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-card/90 backdrop-blur-sm text-foreground px-2 py-1 rounded-lg text-xs font-medium">
            {restaurant.distance}
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm ${
            restaurant.openNow 
              ? 'text-green-700 bg-green-100/90' 
              : 'text-red-700 bg-red-100/90'
          }`}>
            {restaurant.openNow ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1 leading-tight">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>{restaurant.cuisine}</span>
              <span>•</span>
              <span>{restaurant.priceRange}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 ml-3">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
            <span className="text-sm font-medium text-foreground">{restaurant.rating}</span>
            <span className="text-xs text-muted-foreground">({restaurant.reviewCount})</span>
          </div>
        </div>

        {/* Featured Item - Only show if has active demand */}
        {restaurant.hasActiveDemand && (
          <div className="bg-background border border-border rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-foreground">Tonight's Special</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDemandColor(restaurant.featuredItem.demandLevel)}`}>
                {restaurant.featuredItem.demandLevel}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground font-medium">
                {restaurant.featuredItem.name}
              </span>
              <div className="text-right">
                <span className="font-semibold text-foreground">${restaurant.featuredItem.currentPrice}</span>
                {restaurant.featuredItem.currentPrice > restaurant.featuredItem.basePrice && (
                  <div className="text-xs text-muted-foreground">
                    was ${restaurant.featuredItem.basePrice}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <a
            href={`/venue/${restaurant.id}`}
            className="w-full bg-primary text-primary-foreground h-10 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center justify-center text-sm"
          >
            View Menu & Reserve
          </a>
          
          {restaurant.hasActiveDemand && (
            <div className="text-center">
              <span className="text-xs text-muted-foreground">
                {restaurant.featuredItem.reservationCount} people reserved tonight
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}