const steps = [
  {
    number: "01",
    title: "You choose a featured item",
    description: "A house pour, signature cocktail, tonight's special.",
  },
  {
    number: "02",
    title: "Guests scan a QR code",
    description: "They see the item and tonight's price.",
  },
  {
    number: "03",
    title: "They reserve the price",
    description: "$1-2 holds the price for 2 hours.",
  },
  {
    number: "04",
    title: "You see demand in real time",
    description: "Before a single order, you know what's coming.",
  },
  {
    number: "05",
    title: "If they order, the hold becomes credit",
    description: "If they don't, it releases. No risk to them.",
  },
];

export function SolutionSection() {
  return (
    <section className="py-20 md:py-32 px-6 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold mb-6 leading-tight tracking-tight">
            Here's how it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple price reservation system that gives you demand visibility before orders arrive
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {step.number}
                  </span>
                </div>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-3 leading-tight">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional visual emphasis */}
        <div className="mt-16 text-center">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 max-w-2xl mx-auto">
            <div className="text-primary mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Real-time Intelligence</h3>
            <p className="text-muted-foreground">
              Before a single order arrives, you already know what's coming. Make informed decisions about staffing, inventory, and preparation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
