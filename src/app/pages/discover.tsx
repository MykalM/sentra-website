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
    }
  ];

  const cuisines = ["All", "Wine Bar", "Seafood", "American", "Asian Fusion"];

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
        
        {/* Search Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Discover restaurants with real-time demand
          </h1>
          <p className="text-muted-foreground mb-6">
            See what's trending right now and reserve prices before you arrive
          </p>
          
          {/* Search Bar */}
          <div className="grid md:grid-cols-12 gap-4 bg-card border border-border rounded-xl p-6">
            <div className="md:col-span-4">
              <label className="block text-sm font-medium text-foreground mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-11 px-4 text-foreground bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="City, neighborhood, or restaurant"
              />
            </div>
            
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-foreground mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 px-4 text-foreground bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Restaurant or cuisine"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Cuisine</label>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full h-11 px-4 text-foreground bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-11 px-4 text-foreground bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="demand">Live Demand</option>
                <option value="rating">Rating</option>
                <option value="distance">Distance</option>
              </select>
            </div>
            
            <div className="md:col-span-1 flex items-end">
              <button className="w-full bg-primary text-primary-foreground h-11 rounded-md font-medium hover:bg-primary/90 transition-colors">
                Search
              </button>
            </div>
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

        {/* Restaurant Grid */}
        <div className="grid gap-6">
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
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="grid md:grid-cols-12 gap-0">
        
        {/* Restaurant Image */}
        <div className="md:col-span-3">
          <div className="aspect-[4/3] md:aspect-[3/4] relative">
            <img 
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            {restaurant.hasActiveDemand && (
              <div className="absolute top-3 left-3">
                <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  LIVE
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="md:col-span-6 p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {restaurant.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{restaurant.cuisine}</span>
                <span>•</span>
                <span>{restaurant.neighborhood}</span>
                <span>•</span>
                <span>{restaurant.priceRange}</span>
                <span>•</span>
                <span>{restaurant.distance}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm font-medium text-foreground">{restaurant.rating}</span>
                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              </div>
              <p className="text-xs text-muted-foreground">({restaurant.reviewCount} reviews)</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              restaurant.openNow ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
            }`}>
              {restaurant.openNow ? 'Open now' : 'Closed'}
            </span>
          </div>

          {restaurant.hasActiveDemand && (
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Featured tonight</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(restaurant.featuredItem.demandLevel)}`}>
                  {restaurant.featuredItem.demandLevel} demand
                </span>
              </div>
              <h4 className="font-medium text-foreground mb-1">
                {restaurant.featuredItem.name}
              </h4>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {restaurant.featuredItem.reservationCount} reservations
                </span>
                <div className="text-right">
                  <span className="font-semibold text-foreground">${restaurant.featuredItem.currentPrice}</span>
                  {restaurant.featuredItem.currentPrice > restaurant.featuredItem.basePrice && (
                    <span className="text-xs text-muted-foreground ml-1">
                      (${restaurant.featuredItem.basePrice} base)
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Column */}
        <div className="md:col-span-3 p-6 border-l border-border flex flex-col justify-center">
          <a
            href={`/venue/${restaurant.id}`}
            className="w-full bg-primary text-primary-foreground h-11 rounded-md font-medium hover:bg-primary/90 transition-colors inline-flex items-center justify-center mb-3"
          >
            View Live Menu
          </a>
          
          {restaurant.hasActiveDemand && (
            <button className="w-full border border-border text-foreground h-11 rounded-md font-medium hover:bg-muted transition-colors">
              Reserve Featured Item
            </button>
          )}
          
          {!restaurant.hasActiveDemand && (
            <p className="text-center text-xs text-muted-foreground">
              No active demand signals
            </p>
          )}
        </div>
      </div>
    </div>
  );
}