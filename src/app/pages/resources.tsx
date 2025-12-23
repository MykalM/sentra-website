import { Footer } from "../components/footer";
import { useEffect } from "react";

export function ResourcesPage() {
  useEffect(() => {
    document.title = "Resources — Sentra";
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
              <a href="/resources" className="text-foreground font-semibold">Resources</a>
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
            Resources & Insights
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Learn how restaurants are using demand intelligence to optimize operations and increase revenue.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          
          {/* Featured Resource */}
          <div className="bg-background border border-border rounded-xl p-8 mb-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Guide
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  The Complete Guide to Restaurant Demand Intelligence
                </h2>
                <p className="text-muted-foreground mb-6">
                  Learn how leading restaurants are using guest demand signals to optimize everything from inventory to pricing. Includes real case studies and implementation strategies.
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">25 min read</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">Operations</span>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg h-48 flex items-center justify-center">
                <span className="text-muted-foreground">Featured Guide Preview</span>
              </div>
            </div>
          </div>

          {/* Resource Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Case Studies */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Case Studies</h3>
              
              <article className="bg-background border border-border rounded-lg p-6">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-3">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Case Study
                </div>
                <h4 className="font-semibold text-foreground mb-2">Wine Bar Increases Revenue 23% with Demand Signals</h4>
                <p className="text-sm text-muted-foreground mb-4">How a neighborhood wine bar used Sentra to optimize their happy hour pricing and reduce waste.</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>8 min read</span>
                  <span>•</span>
                  <span>Revenue</span>
                </div>
              </article>

              <article className="bg-background border border-border rounded-lg p-6">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-3">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Case Study
                </div>
                <h4 className="font-semibold text-foreground mb-2">Fine Dining Restaurant Eliminates Food Waste</h4>
                <p className="text-sm text-muted-foreground mb-4">A Michelin-starred restaurant's journey to zero waste through predictive demand insights.</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>12 min read</span>
                  <span>•</span>
                  <span>Sustainability</span>
                </div>
              </article>
            </div>

            {/* Best Practices */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Best Practices</h3>
              
              <article className="bg-background border border-border rounded-lg p-6">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-500 mb-3">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Guide
                </div>
                <h4 className="font-semibold text-foreground mb-2">Dynamic Pricing Strategies That Work</h4>
                <p className="text-sm text-muted-foreground mb-4">Learn how to implement effective dynamic pricing without alienating guests.</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>15 min read</span>
                  <span>•</span>
                  <span>Pricing</span>
                </div>
              </article>

              <article className="bg-background border border-border rounded-lg p-6">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-500 mb-3">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Guide
                </div>
                <h4 className="font-semibold text-foreground mb-2">Staff Training for Demand-Driven Service</h4>
                <p className="text-sm text-muted-foreground mb-4">How to train your team to use demand intelligence effectively.</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>10 min read</span>
                  <span>•</span>
                  <span>Operations</span>
                </div>
              </article>

              <article className="bg-background border border-border rounded-lg p-6">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-500 mb-3">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Guide
                </div>
                <h4 className="font-semibold text-foreground mb-2">QR Code Implementation Guide</h4>
                <p className="text-sm text-muted-foreground mb-4">Best practices for QR code placement and guest experience design.</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>7 min read</span>
                  <span>•</span>
                  <span>Implementation</span>
                </div>
              </article>
            </div>

            {/* Industry Insights */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Industry Insights</h3>
              
              <article className="bg-background border border-border rounded-lg p-6">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-orange-500 mb-3">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Report
                </div>
                <h4 className="font-semibold text-foreground mb-2">Restaurant Technology Trends 2024</h4>
                <p className="text-sm text-muted-foreground mb-4">Annual report on technology adoption in the restaurant industry.</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>20 min read</span>
                  <span>•</span>
                  <span>Industry</span>
                </div>
              </article>

              <article className="bg-background border border-border rounded-lg p-6">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-orange-500 mb-3">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Report
                </div>
                <h4 className="font-semibold text-foreground mb-2">The Future of Guest Experience</h4>
                <p className="text-sm text-muted-foreground mb-4">How demand intelligence is reshaping the dining experience.</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>18 min read</span>
                  <span>•</span>
                  <span>Future</span>
                </div>
              </article>

              <article className="bg-background border border-border rounded-lg p-6">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-orange-500 mb-3">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Report
                </div>
                <h4 className="font-semibold text-foreground mb-2">ROI Calculator for Restaurant Tech</h4>
                <p className="text-sm text-muted-foreground mb-4">Interactive tool to calculate the return on restaurant technology investments.</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>Interactive</span>
                  <span>•</span>
                  <span>ROI</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-foreground font-semibold mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get the latest insights on restaurant intelligence and industry trends delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 text-foreground bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <button className="bg-primary text-primary-foreground text-sm font-medium h-12 px-6 rounded-md hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-6 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-foreground font-semibold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the pilot program and start implementing demand intelligence in your restaurant.
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