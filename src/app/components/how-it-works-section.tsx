import { Link } from "react-router-dom";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Guests Discover",
      description: "Browse restaurants near you and see what's trending tonight",
      visual: "🔍",
      details: "Use our Uber Eats-style discovery to find restaurants with live demand signals"
    },
    {
      number: "02", 
      title: "Reserve Price",
      description: "Lock in tonight's price with a small deposit before you arrive",
      visual: "💰",
      details: "Reserve featured items at current prices - even if demand drives prices up later"
    },
    {
      number: "03",
      title: "Show & Enjoy", 
      description: "Present your reservation code to your server and enjoy your meal",
      visual: "🍽️",
      details: "Your reserved price is honored regardless of current demand pricing"
    }
  ];

  const benefits = [
    {
      icon: "📊",
      title: "Real-Time Intelligence",
      description: "See what guests want before they order with live demand data"
    },
    {
      icon: "🎯", 
      title: "Demand Forecasting",
      description: "Plan inventory and staffing based on actual reservation data"
    },
    {
      icon: "📱",
      title: "No Hardware Needed", 
      description: "Deploy instantly with QR codes - no POS integration required"
    },
    {
      icon: "💸",
      title: "Dynamic Pricing",
      description: "Optimize revenue with demand-based pricing that guests can reserve"
    }
  ];

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            How It Works
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A simple three-step process that revolutionizes how restaurants understand guest demand
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 mb-24">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              {/* Step Number */}
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                {step.number}
              </div>
              
              {/* Visual */}
              <div className="text-6xl mb-6">
                {step.visual}
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                {step.description}
              </p>
              <p className="text-sm text-muted-foreground">
                {step.details}
              </p>
            </div>
          ))}
        </div>

        {/* Arrow Connectors for Desktop */}
        <div className="hidden lg:block relative -mt-32 mb-24">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <div className="flex-1"></div>
            <div className="flex items-center text-primary">
              <div className="w-8 h-0.5 bg-primary"></div>
              <div className="w-3 h-3 border-2 border-primary border-l-0 border-b-0 transform rotate-45 -ml-2"></div>
            </div>
            <div className="flex-1"></div>
            <div className="flex items-center text-primary">
              <div className="w-8 h-0.5 bg-primary"></div>
              <div className="w-3 h-3 border-2 border-primary border-l-0 border-b-0 transform rotate-45 -ml-2"></div>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>

        {/* Benefits for Restaurants */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Why Restaurants Love Sentra
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get unprecedented visibility into guest demand with actionable insights that drive revenue
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 bg-card border border-border rounded-2xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">
                {benefit.icon}
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">
                {benefit.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-card border-2 border-border rounded-2xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to See Guest Demand in Real-Time?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join Portland's leading restaurants and start understanding your guests like never before
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-primary text-primary-foreground text-lg font-medium h-14 px-10 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center justify-center"
              >
                Start Free Trial
              </Link>
              <Link
                to="/demo"
                className="border-2 border-border text-foreground text-lg font-medium h-14 px-10 rounded-md hover:bg-muted transition-colors inline-flex items-center justify-center"
              >
                Book Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}