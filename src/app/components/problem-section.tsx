export function ProblemSection() {
  return (
    <section className="py-20 md:py-32 px-6 bg-card border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold mb-8 leading-tight tracking-tight">
          Friday night shouldn't feel like guesswork
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-muted/50 p-6 rounded-lg border border-border">
            <div className="text-destructive mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Operational Chaos</h3>
            <p className="text-muted-foreground leading-relaxed">
              You overstaffed last week. Understaffed this week. The Chardonnay ran out at 9pm. Three tables waited too long and left annoyed.
            </p>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg border border-border">
            <div className="text-destructive mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Missing Intelligence</h3>
            <p className="text-muted-foreground leading-relaxed">
              You're not bad at this. You just don't have the information you need — until it's too late to act on it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
