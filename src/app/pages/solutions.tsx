import { Footer } from "../components/footer";
import { useEffect } from "react";

export function SolutionsPage() {
  useEffect(() => {
    document.title = "Solutions — Sentra";
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
              <a href="/solutions" className="text-foreground font-semibold">Solutions</a>
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
            Solutions for Every Restaurant Challenge
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            From fine dining to fast-casual, Sentra adapts to your unique needs and helps solve the most common restaurant pain points.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Solution 1 */}
            <div className="bg-background border border-border rounded-xl p-8">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Demand Forecasting</h3>
              <p className="text-muted-foreground mb-6">
                Know what guests want before they arrive. See real demand patterns and adjust your menu and pricing accordingly.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Real-time demand signals
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Predictive analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Dynamic pricing optimization
                </li>
              </ul>
            </div>

            {/* Solution 2 */}
            <div className="bg-background border border-border rounded-xl p-8">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Revenue Optimization</h3>
              <p className="text-muted-foreground mb-6">
                Maximize revenue per guest through intelligent price signals and demand-based menu optimization.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Dynamic pricing strategies
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Peak hour optimization
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Menu mix analysis
                </li>
              </ul>
            </div>

            {/* Solution 3 */}
            <div className="bg-background border border-border rounded-xl p-8">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Staff Efficiency</h3>
              <p className="text-muted-foreground mb-6">
                Reduce waste and optimize staffing by knowing exactly what to prepare and when guests will arrive.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Prep time optimization
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Service timing insights
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Kitchen workflow planning
                </li>
              </ul>
            </div>

            {/* Solution 4 */}
            <div className="bg-background border border-border rounded-xl p-8">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Inventory Management</h3>
              <p className="text-muted-foreground mb-6">
                Reduce food waste and optimize ordering by predicting demand for specific ingredients and dishes.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Demand-driven ordering
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Waste reduction insights
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Ingredient optimization
                </li>
              </ul>
            </div>

            {/* Solution 5 */}
            <div className="bg-background border border-border rounded-xl p-8">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Guest Experience</h3>
              <p className="text-muted-foreground mb-6">
                Create memorable experiences by understanding guest preferences and timing their favorites perfectly.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Personalized recommendations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Service timing optimization
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Preference tracking
                </li>
              </ul>
            </div>

            {/* Solution 6 */}
            <div className="bg-background border border-border rounded-xl p-8">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Operational Intelligence</h3>
              <p className="text-muted-foreground mb-6">
                Make data-driven decisions with real-time insights into every aspect of your restaurant operations.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Real-time dashboards
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Performance metrics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Trend analysis
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-6 bg-background border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-foreground font-semibold mb-6">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the pilot program and see how Sentra can solve your biggest operational challenges.
          </p>
          <a
            href="/#pilot"
            className="bg-primary text-primary-foreground text-base font-medium h-12 px-8 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
          >
            Join the Pilot Program
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}