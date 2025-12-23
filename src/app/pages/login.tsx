import { useState } from "react";
import { useEffect } from "react";

export function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.title = "Sign In — Sentra";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In real app, handle login logic here
      console.log("Login submitted:", formData);
      // Redirect to dashboard on successful login
      window.location.href = '/dashboard';
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding/Info */}
      <div className="hidden lg:flex lg:flex-1 bg-card">
        <div className="flex flex-col justify-center px-12 py-12">
          <div className="max-w-lg">
            <h2 className="text-3xl font-semibold text-foreground mb-6">
              Welcome back to your restaurant intelligence dashboard
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Live demand dashboard</h3>
                  <p>Track guest reservations and demand signals in real-time as they happen.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Staff management</h3>
                  <p>Give your team the tools they need to validate reservations and optimize service.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Revenue insights</h3>
                  <p>Track conversion rates, popular items, and revenue optimization opportunities.</p>
                </div>
              </div>
            </div>

            {/* Live stats simulation */}
            <div className="mt-12 p-6 bg-background border border-border rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-foreground">Today's Activity</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Live</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-foreground">47</div>
                  <div className="text-xs text-muted-foreground">QR Scans</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-primary">12</div>
                  <div className="text-xs text-muted-foreground">Active</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-green-500">8</div>
                  <div className="text-xs text-muted-foreground">Redeemed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 border-l border-border">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div>
            <a href="/" className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground text-xl font-semibold">S</span>
              </div>
              <h3 className="text-2xl text-foreground font-semibold tracking-tight">Sentra</h3>
            </a>
            <h2 className="text-3xl font-semibold text-foreground">Sign in to your account</h2>
            <p className="mt-2 text-muted-foreground">
              Access your restaurant intelligence dashboard
            </p>
          </div>

          {/* Social login options */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 h-12 px-4 border border-border rounded-lg hover:bg-muted transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 h-12 px-4 border border-border rounded-lg hover:bg-muted transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

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
                value={formData.email}
                onChange={handleChange}
                className={`w-full h-12 px-4 text-foreground bg-input border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
                  errors.email ? 'border-red-500' : 'border-border'
                }`}
                placeholder="you@restaurant.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`w-full h-12 px-4 text-foreground bg-input border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all ${
                  errors.password ? 'border-red-500' : 'border-border'
                }`}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-muted-foreground">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="/forgot-password" className="text-primary hover:underline">
                  Forgot your password?
                </a>
              </div>
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
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Sign up link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <a href="/signup" className="text-primary font-medium hover:underline">
                Sign up
              </a>
            </p>
          </div>

          {/* Help section */}
          <div className="border-t border-border pt-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-3">Need help getting started?</p>
              <div className="flex justify-center gap-4 text-xs">
                <a href="/demo" className="text-primary hover:underline">Watch Demo</a>
                <span className="text-muted-foreground">•</span>
                <a href="/resources" className="text-primary hover:underline">Documentation</a>
                <span className="text-muted-foreground">•</span>
                <a href="/about" className="text-primary hover:underline">Contact Support</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}