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
          
          {/* Navigation Menu - Benchling style */}
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

      {/* Hero Content */}
      <div className="flex-1 flex items-center px-6 pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground font-semibold mb-6 tracking-tight">
                Set the New Speed of
                <br />
                <span className="text-primary">Restaurant Intelligence</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Know what your guests want before they order. Guests reserve prices. You see demand. No hardware required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href="/discover"
                  className="bg-primary text-primary-foreground text-base font-medium h-12 px-8 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
                >
                  Discover Restaurants
                </a>
                <a href="/demo" className="border border-border text-foreground text-base font-medium h-12 px-8 rounded-md hover:bg-muted transition-colors inline-flex items-center justify-center">
                  Watch Demo
                </a>
              </div>

              {/* Client logos section - Benchling style */}
              <div>
                <p className="text-sm text-muted-foreground mb-4 font-medium">Trusted by leading restaurants</p>
                <div className="flex items-center gap-8 opacity-60">
                  <div className="text-muted-foreground text-sm font-medium">Restaurant A</div>
                  <div className="text-muted-foreground text-sm font-medium">Restaurant B</div>
                  <div className="text-muted-foreground text-sm font-medium">Restaurant C</div>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden bg-card border border-border">
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent z-10" />
                <img
                  src="https://images.unsplash.com/photo-1676324061808-b0fd26c027f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwYmFyJTIwZXZlbmluZyUyMGdvbGRlbiUyMGxpZ2h0fGVufDF8fHx8MTc2NjUxNjEzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Restaurant demand dashboard interface"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
