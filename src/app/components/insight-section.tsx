export function InsightSection() {
  return (
    <section className="py-20 md:py-32 px-6 bg-card border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold mb-6 leading-tight tracking-tight">
            A guest who puts money down is telling you the truth
          </h2>
          
          <p className="text-xl text-muted-foreground mb-4">
            Browsing is noise. <span className="text-primary font-medium">Reserving is signal.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-background border border-border rounded-lg p-6">
            <div className="text-primary mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Smart Staffing</h3>
            <p className="text-muted-foreground">
              Staff to actual demand — not last week's guess
            </p>
          </div>

          <div className="bg-background border border-border rounded-lg p-6">
            <div className="text-primary mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Prevent Stockouts</h3>
            <p className="text-muted-foreground">
              Avoid stockouts — you see the run before it happens
            </p>
          </div>

          <div className="bg-background border border-border rounded-lg p-6">
            <div className="text-primary mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Confident Pricing</h3>
            <p className="text-muted-foreground">
              Price with confidence — when 12 people reserve, you know it's moving
            </p>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Transform uncertainty into operational intelligence
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every reservation is a data point. Every data point is an opportunity to serve better, staff smarter, and operate with confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
