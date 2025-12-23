import { Footer } from "../components/footer";
import { useEffect } from "react";

export function PlatformPage() {
  useEffect(() => {
    document.title = "Platform — Sentra";
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
              <a href="/platform" className="text-foreground font-semibold">Platform</a>
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
            The Complete Restaurant Intelligence Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            A seamless system that connects guest demand with restaurant operations. No hardware, no hassle, just intelligence.
          </p>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-foreground font-semibold mb-6">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple components that revolutionize how restaurants understand demand.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Guest Experience */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Guest Interface</h3>
              <p className="text-muted-foreground mb-6">
                Guests scan QR codes to see featured items and reserve prices with a small deposit. Simple, fast, engaging.
              </p>
              <div className="bg-background border border-border rounded-lg p-4 text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">QR code scanning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Price reservation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Mobile-optimized</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Operator Dashboard */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Operator Dashboard</h3>
              <p className="text-muted-foreground mb-6">
                Real-time insights into guest demand, conversion rates, and revenue opportunities. Everything you need in one place.
              </p>
              <div className="bg-background border border-border rounded-lg p-4 text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Live demand tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Revenue analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Staff interface</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Intelligence Engine */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Intelligence Engine</h3>
              <p className="text-muted-foreground mb-6">
                Advanced analytics that turn guest signals into actionable insights for pricing, inventory, and operations.
              </p>
              <div className="bg-background border border-border rounded-lg p-4 text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Demand prediction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Dynamic pricing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Trend analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-foreground font-semibold mb-6">
              Built for Restaurant Operations
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every feature designed with real restaurant challenges in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Zero Setup Required</h3>
              <p className="text-muted-foreground mb-6">
                No hardware installation, no POS integration complexity. Start collecting demand signals immediately with just QR codes.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Cloud-based platform</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Works with any device</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">No technical expertise needed</span>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Real-Time Intelligence</h3>
              <p className="text-muted-foreground mb-6">
                See demand patterns emerge as they happen. Make informed decisions about pricing, preparation, and service.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Live demand tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Instant alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Performance metrics</span>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Seamless Integration</h3>
              <p className="text-muted-foreground mb-6">
                Designed to complement your existing operations. No disruption to current workflows or guest experience.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Works with any POS</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Staff-friendly interface</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Guest privacy focused</span>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Actionable Insights</h3>
              <p className="text-muted-foreground mb-6">
                Transform guest signals into clear actions. Know when to adjust prices, what to prepare, and how to optimize service.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Pricing recommendations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Inventory optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Service timing</span>
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
            Experience the Platform
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            See how Sentra's intelligence platform can transform your restaurant operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/demo"
              className="border border-border text-foreground text-base font-medium h-12 px-8 rounded-md hover:bg-background transition-colors inline-flex items-center justify-center"
            >
              Watch Demo
            </a>
            <a
              href="/#pilot"
              className="bg-primary text-primary-foreground text-base font-medium h-12 px-8 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
            >
              Join the Pilot
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}