import { useEffect } from "react";

export function QRPage() {
  useEffect(() => {
    document.title = "QR Demo — Sentra";
  }, []);

  const handleScanDemo = () => {
    // Simulate QR code scan by redirecting to guest experience
    window.location.href = '/guest?venue=escape-360';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="flex items-center gap-3 justify-center mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground text-xl font-semibold">S</span>
            </div>
            <h3 className="text-2xl text-foreground font-semibold tracking-tight">Sentra</h3>
          </a>
          
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            QR Code Demo
          </h1>
          <p className="text-muted-foreground">
            Experience what guests see when they scan QR codes at restaurants
          </p>
        </div>

        {/* Mock QR Code */}
        <div className="bg-card border border-border rounded-xl p-8 mb-8">
          <div className="w-48 h-48 bg-background border-2 border-dashed border-border rounded-lg mx-auto mb-6 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-muted-foreground mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                <rect x="7" y="7" width="3" height="3" fill="currentColor" />
                <rect x="14" y="7" width="3" height="3" fill="currentColor" />
                <rect x="7" y="14" width="3" height="3" fill="currentColor" />
                <rect x="14" y="14" width="3" height="3" fill="currentColor" />
              </svg>
              <p className="text-sm text-muted-foreground">Mock QR Code</p>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="font-semibold text-foreground mb-2">Escape 360 Wine Bar</h3>
            <p className="text-sm text-muted-foreground mb-4">Table QR Code</p>
            <p className="text-xs text-muted-foreground">
              Scan to see tonight's featured selection
            </p>
          </div>
        </div>

        {/* Simulate Scan Button */}
        <button
          onClick={handleScanDemo}
          className="w-full bg-primary text-primary-foreground h-12 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors mb-6"
        >
          Simulate QR Code Scan
        </button>

        {/* Info */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2">What happens next:</h4>
          <div className="text-sm text-muted-foreground space-y-1 text-left">
            <p>• See tonight's featured wine selection</p>
            <p>• View current pricing and availability</p>
            <p>• Reserve your price with a small deposit</p>
            <p>• Get a redemption code for your server</p>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <a href="/" className="text-primary text-sm hover:underline">
            ← Back to marketing site
          </a>
        </div>
      </div>
    </div>
  );
}