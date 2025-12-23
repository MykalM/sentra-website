import { Footer } from "../components/footer";
import { useEffect } from "react";

export function AboutPage() {
  useEffect(() => {
    document.title = "About — Sentra";
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
              <a href="/about" className="text-foreground font-semibold">About</a>
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
            Revolutionizing Restaurant Intelligence
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            We're building the future where every restaurant knows what their guests want before they order. No guesswork, just intelligence.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl text-foreground font-semibold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Every restaurant deserves to know their guests' preferences before service begins. We're eliminating the guesswork that leads to waste, missed revenue, and disappointed guests.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sentra transforms guest demand signals into actionable intelligence, giving restaurants the superpower of foresight in an industry built on uncertainty.
              </p>
            </div>
            <div className="bg-background border border-border rounded-xl p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Intelligence First</h3>
                    <p className="text-sm text-muted-foreground">Every restaurant decision should be backed by real guest demand data.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Simplicity Matters</h3>
                    <p className="text-sm text-muted-foreground">Complex problems require simple solutions that actually get used.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Guest Centric</h3>
                    <p className="text-sm text-muted-foreground">Better restaurants create better experiences for everyone.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-foreground font-semibold mb-12 text-center">
            How We Started
          </h2>
          <div className="prose prose-lg max-w-none">
            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                "We were running a wine bar and constantly struggled with the same questions: How much of each wine should we open? Which dishes would be popular tonight? When should we adjust prices?"
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                "We had all this technology—POS systems, inventory management, social media—but none of it told us what our guests actually wanted before they walked through the door."
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                "That's when we realized the solution wasn't more complex analytics. It was asking guests directly what they wanted and letting them show their interest with their wallets. Sentra was born from this simple insight."
              </p>
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                <div className="w-12 h-12 bg-muted rounded-full"></div>
                <div>
                  <div className="font-semibold text-foreground">Michael Morton</div>
                  <div className="text-sm text-muted-foreground">Founder & CEO</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-foreground font-semibold mb-16 text-center">
            What We Believe
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Innovation Through Simplicity</h3>
              <p className="text-muted-foreground">
                The best solutions feel obvious once you see them. We focus on building tools so intuitive they feel like magic.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Restaurants First</h3>
              <p className="text-muted-foreground">
                Every feature is designed by people who've worked in restaurants, for people currently running them.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Data Privacy</h3>
              <p className="text-muted-foreground">
                Guest data stays with restaurants. We build intelligence without compromising privacy or creating dependencies.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Sustainable Growth</h3>
              <p className="text-muted-foreground">
                Better intelligence leads to less waste, higher efficiency, and more sustainable restaurant operations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Transparency</h3>
              <p className="text-muted-foreground">
                No hidden fees, no lock-in contracts, no surprise charges. Simple pricing for simple solutions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Community Impact</h3>
              <p className="text-muted-foreground">
                Stronger restaurants build stronger communities. We're here to help local businesses thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-foreground font-semibold mb-6">
            Building the Future
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            We're a small team with big restaurant experience, backed by industry veterans who understand the challenges of running successful food businesses.
          </p>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-lg text-muted-foreground mb-6">
              Currently in stealth mode, but actively working with forward-thinking restaurants to build the future of demand intelligence.
            </p>
            <p className="text-muted-foreground">
              Interested in joining our mission? We're always looking for talented people who share our passion for transforming the restaurant industry.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-6 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-foreground font-semibold mb-6">
            Join Our Journey
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Be part of the pilot program that's defining the future of restaurant intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#pilot"
              className="bg-primary text-primary-foreground text-base font-medium h-12 px-8 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
            >
              Join the Pilot Program
            </a>
            <a
              href="/resources"
              className="border border-border text-foreground text-base font-medium h-12 px-8 rounded-md hover:bg-background transition-colors inline-flex items-center justify-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}