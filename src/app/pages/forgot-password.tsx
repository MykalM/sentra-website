import { useState } from "react";
import { useEffect } from "react";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Forgot Password — Sentra";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email) {
      setError("Email is required");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div>
          <a href="/" className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground text-xl font-semibold">S</span>
            </div>
            <h3 className="text-2xl text-foreground font-semibold tracking-tight">Sentra</h3>
          </a>

          {!isSubmitted ? (
            <>
              <h2 className="text-3xl font-semibold text-foreground text-center">Forgot your password?</h2>
              <p className="mt-2 text-muted-foreground text-center">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-semibold text-foreground text-center">Check your email</h2>
              <p className="mt-2 text-muted-foreground text-center">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </>
          )}
        </div>

        {!isSubmitted ? (
          <>
            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className={`w-full h-12 px-4 text-foreground bg-input border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
                    error ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="you@restaurant.com"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground h-12 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending reset link...
                  </>
                ) : (
                  'Send reset link'
                )}
              </button>
            </form>

            {/* Back to login */}
            <div className="text-center">
              <a href="/login" className="text-primary text-sm font-medium hover:underline">
                ← Back to sign in
              </a>
            </div>
          </>
        ) : (
          <>
            {/* Success state */}
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-muted-foreground mb-4">
                If an account with this email exists, you'll receive a password reset link within a few minutes.
              </p>
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail("");
                  }}
                  className="text-primary hover:underline"
                >
                  try again
                </button>
              </p>
            </div>

            {/* Back to login */}
            <div className="text-center">
              <a href="/login" className="text-primary text-sm font-medium hover:underline">
                ← Back to sign in
              </a>
            </div>
          </>
        )}

        {/* Help */}
        <div className="border-t border-border pt-6">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-3">Still having trouble?</p>
            <div className="flex justify-center gap-4 text-xs">
              <a href="/demo" className="text-primary hover:underline">Watch Demo</a>
              <span className="text-muted-foreground">•</span>
              <a href="/about" className="text-primary hover:underline">Contact Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}