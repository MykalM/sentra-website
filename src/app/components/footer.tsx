export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 md:py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-semibold">S</span>
            </div>
            <h3 className="text-lg md:text-xl text-foreground font-semibold">Sentra</h3>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <span className="text-sm text-muted-foreground">Built for hospitality, not against it.</span>
            <div className="flex items-center gap-4 text-sm">
              <a
                href="mailto:hello@sentra.so"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                hello@sentra.so
              </a>
              <span className="text-border">·</span>
              <a href="#privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <span className="text-border">·</span>
              <a href="#terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Sentra. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Transforming restaurant operations with intelligent demand forecasting.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}