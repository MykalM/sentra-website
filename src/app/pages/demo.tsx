import { Footer } from "../components/footer";
import { useEffect } from "react";

export function DemoPage() {
  useEffect(() => {
    document.title = "Demo — Sentra";
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className="relative z-20 px-6 py-6 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground text-lg font-semibold">S</span>
              </div>
              <h3 className="text-2xl text-foreground font-semibold tracking-tight">Sentra</h3>
            </a>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6 text-sm font-medium">
              <a href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">Solutions</a>
              <a href="/platform" className="text-muted-foreground hover:text-foreground transition-colors">Platform</a>
              <a href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Resources</a>
              <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            </div>
            <a
              href="/#pilot"
              className="bg-primary text-primary-foreground text-sm font-medium h-10 px-6 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-foreground font-semibold mb-6 leading-tight tracking-tight">
            See Sentra in Action
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Watch how restaurants use Sentra to transform guest demand signals into actionable intelligence.
          </p>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="bg-background border border-border rounded-2xl overflow-hidden">
            {/* Video Placeholder */}
            <div className="aspect-video bg-muted/30 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Demo Video</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Coming soon! Watch a complete walkthrough of Sentra from guest experience to operator insights.
                </p>
                <button className="bg-primary text-primary-foreground text-sm font-medium h-10 px-6 rounded-md hover:bg-primary/90 transition-colors">
                  Request Early Access
                </button>
              </div>
            </div>
            
            {/* Video Controls Placeholder */}
            <div className="p-6 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-muted rounded-full"></div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Complete Platform Demo</h4>
                    <p className="text-xs text-muted-foreground">8:42 minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Full HD</span>
                  <span>•</span>
                  <span>Interactive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-foreground font-semibold mb-6">
              Interactive Demo
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience how Sentra works from both the guest and operator perspectives.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Guest Experience */}
            <div>
              <div className="bg-card border border-border rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Guest Experience</h3>
                </div>
                
                {/* Mock Phone Interface */}
                <div className="bg-background border border-border rounded-lg p-4 max-w-xs mx-auto">
                  <div className="text-center space-y-4">
                    <div className="h-2 w-full bg-muted/50 rounded mb-4"></div>
                    <h4 className="font-semibold">Escape 360 Wine Bar</h4>
                    <p className="text-sm text-muted-foreground">This evening</p>
                    
                    <div className="bg-card border border-border rounded-lg p-4 text-left">
                      <h5 className="font-medium mb-2">Featured Tonight</h5>
                      <p className="font-semibold">Burgundian Chardonnay</p>
                      <p className="text-sm text-muted-foreground mb-3">2019 Domaine Leflaive</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">$24</span>
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Reserve $2</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-primary text-primary-foreground py-2 rounded-md text-sm font-medium">
                      Reserve Price
                    </button>
                    
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>• Reserve for $2</p>
                      <p>• Order = $2 becomes your discount</p>
                      <p>• Don't order = auto-release in 30 min</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button className="text-primary text-sm font-medium hover:underline">
                    Try Interactive Demo →
                  </button>
                </div>
              </div>
            </div>

            {/* Operator Dashboard */}
            <div>
              <div className="bg-card border border-border rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Operator Dashboard</h3>
                </div>
                
                {/* Mock Dashboard */}
                <div className="bg-background border border-border rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-card border border-border rounded-lg p-3 text-center">
                      <div className="text-lg font-semibold text-foreground">23</div>
                      <div className="text-xs text-muted-foreground">QR Views</div>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-3 text-center">
                      <div className="text-lg font-semibold text-primary">7</div>
                      <div className="text-xs text-muted-foreground">Active Reservations</div>
                    </div>
                  </div>
                  
                  <div className="bg-card border border-border rounded-lg p-3">
                    <h5 className="font-medium mb-2 text-sm">Tonight's Feature</h5>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">Burgundian Chardonnay</p>
                        <p className="text-xs text-muted-foreground">$24 • 7 reservations</p>
                      </div>
                      <div className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">
                        High Demand
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Recent Activity</h5>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-mono">ABC123</span>
                        <span className="text-green-500">✓ Redeemed</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-mono">DEF456</span>
                        <span className="text-primary">⏳ Active</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button className="text-primary text-sm font-medium hover:underline">
                    Explore Dashboard →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Walkthrough */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-foreground font-semibold mb-6">
              Step-by-Step Walkthrough
            </h2>
            <p className="text-xl text-muted-foreground">
              See how Sentra works from setup to insights in under 5 minutes.
            </p>
          </div>

          <div className="space-y-8">
            
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">Setup Featured Item</h3>
                <p className="text-muted-foreground mb-4">
                  Choose your featured item, set the base price and reservation fee. Generate QR codes instantly.
                </p>
                <div className="bg-background border border-border rounded-lg p-4 text-sm text-muted-foreground">
                  Takes 2 minutes • No technical setup required
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">Guests Scan & Reserve</h3>
                <p className="text-muted-foreground mb-4">
                  Guests scan QR codes, see featured items, and reserve prices with small deposits. Mobile-optimized experience.
                </p>
                <div className="bg-background border border-border rounded-lg p-4 text-sm text-muted-foreground">
                  15 seconds per reservation • Works on any smartphone
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">Real-Time Intelligence</h3>
                <p className="text-muted-foreground mb-4">
                  Watch demand signals appear on your dashboard. See conversion rates, popular items, and revenue opportunities.
                </p>
                <div className="bg-background border border-border rounded-lg p-4 text-sm text-muted-foreground">
                  Live updates • Actionable insights • Mobile dashboard
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6 items-start">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold flex-shrink-0">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">Staff Redemption</h3>
                <p className="text-muted-foreground mb-4">
                  Staff validate guest codes instantly. Seamless integration with your existing service workflow.
                </p>
                <div className="bg-background border border-border rounded-lg p-4 text-sm text-muted-foreground">
                  One-tap validation • Staff-friendly interface • Works offline
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-foreground font-semibold mb-6">
              Calculate Your ROI
            </h2>
            <p className="text-xl text-muted-foreground">
              See how much revenue Sentra could generate for your restaurant.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Average nightly covers
                  </label>
                  <input 
                    type="number" 
                    placeholder="50" 
                    className="w-full h-12 px-4 text-foreground bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Average check size
                  </label>
                  <input 
                    type="number" 
                    placeholder="45" 
                    className="w-full h-12 px-4 text-foreground bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nights per week
                  </label>
                  <input 
                    type="number" 
                    placeholder="5" 
                    className="w-full h-12 px-4 text-foreground bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Projected Monthly Impact</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">QR Code Scans:</span>
                    <span className="font-semibold">~800</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Demand Signals:</span>
                    <span className="font-semibold">~160</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue Increase:</span>
                    <span className="font-semibold text-primary">$2,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Waste Reduction:</span>
                    <span className="font-semibold text-primary">$800</span>
                  </div>
                  <div className="border-t border-border pt-3 mt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total Monthly Value:</span>
                      <span className="font-semibold text-primary">$3,200</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-6 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-foreground font-semibold mb-6">
            Ready to See It Live?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the pilot program and start using Sentra in your restaurant this week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#pilot"
              className="bg-primary text-primary-foreground text-base font-medium h-12 px-8 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
            >
              Join the Pilot Program
            </a>
            <a
              href="/qr"
              className="border border-border text-foreground text-base font-medium h-12 px-8 rounded-md hover:bg-background transition-colors inline-flex items-center justify-center"
            >
              Try Customer Experience
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}