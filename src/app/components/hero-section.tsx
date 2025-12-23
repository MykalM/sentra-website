interface HeroSectionProps {
  onCtaClick: () => void;
}

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <section className="relative bg-background min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="relative z-20 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground text-lg font-semibold">S</span>
            </div>
            <h3 className="text-2xl text-foreground font-semibold tracking-tight">Sentra</h3>
          </div>
          
          {/* Navigation Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6 text-sm font-medium">
              <a href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">Solutions</a>
              <a href="/platform" className="text-muted-foreground hover:text-foreground transition-colors">Platform</a>
              <a href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Resources</a>
              <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/login"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="bg-primary text-primary-foreground text-sm font-medium h-10 px-6 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content - inKind style */}
      <div className="flex-1 flex items-center px-6 py-20">
        <div className="max-w-7xl mx-auto w-full text-center">
          
          {/* Main Headline */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight text-foreground font-bold mb-6 tracking-tight">
              See Guest Demand
              <br />
              <span className="text-primary">Before They Order</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-4 leading-relaxed max-w-4xl mx-auto">
              Guests reserve prices on their favorite items. You see what's coming tonight.
            </p>
            
            <div className="text-lg text-primary font-semibold mb-8">
              $2.5M in demand tracked across 150+ restaurants
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="/discover"
              className="bg-primary text-primary-foreground text-lg font-medium h-14 px-10 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
            >
              Find Restaurants Near You
            </a>
            <a 
              href="/demo" 
              className="border-2 border-border text-foreground text-lg font-medium h-14 px-10 rounded-md hover:bg-card transition-colors inline-flex items-center justify-center"
            >
              Watch Demo
            </a>
          </div>

          {/* Social Proof */}
          <div className="mb-12">
            <p className="text-sm text-muted-foreground mb-6 font-medium">Trusted by Portland's Top Restaurants</p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="text-muted-foreground text-sm font-medium">Escape 360</div>
              <div className="text-muted-foreground text-sm font-medium">Portland Oyster House</div>
              <div className="text-muted-foreground text-sm font-medium">Blue Moon Coffee</div>
              <div className="text-muted-foreground text-sm font-medium">Corner Bistro</div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-card border-2 border-border shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=500&fit=crop&auto=format"
                alt="Restaurant with live demand tracking interface"
                className="w-full h-full object-cover opacity-90"
              />
              
              {/* Floating UI Elements */}
              <div className="absolute top-6 left-6 z-20">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg">
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                  12 Items Reserved Tonight
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 z-20">
                <div className="bg-card/95 backdrop-blur-sm border border-border text-foreground px-4 py-3 rounded-lg text-sm shadow-lg">
                  <div className="font-semibold mb-1">Duck Confit</div>
                  <div className="text-primary font-bold">$28 <span className="text-muted-foreground text-xs">11 reservations</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
