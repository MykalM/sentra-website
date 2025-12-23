import { useState } from "react";

export function PilotCtaSection() {
  const [formData, setFormData] = useState({
    name: "",
    venue: "",
    city: "",
    email: "",
    headache: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Submit to Formspree (you'll need to replace with your actual endpoint)
      const response = await fetch('https://formspree.io/f/xpzvgqan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Sentra Pilot Application: ${formData.venue}`,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: "",
            venue: "",
            city: "",
            email: "",
            headache: "",
          });
        }, 5000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // You could add error state handling here
      alert('There was an error submitting the form. Please try again or email us directly at hello@sentra.so');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-20 md:py-32 px-6 bg-background border-t border-border" id="pilot">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold mb-6 leading-tight tracking-tight">
            Join the Pilot Program
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're selecting 5 forward-thinking venues to test Sentra. Get priority access and help shape the future of restaurant intelligence.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 text-left max-w-xl mx-auto mb-8">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <span className="text-muted-foreground">Zero setup costs</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <span className="text-muted-foreground">No hardware needed</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <span className="text-muted-foreground">Works with any POS</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <span className="text-muted-foreground">30-day pilot</span>
            </div>
          </div>
          
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 max-w-lg mx-auto">
            <h3 className="text-foreground font-semibold mb-2">🍷 Risk-Free Guarantee</h3>
            <p className="text-muted-foreground">
              If Sentra doesn't give you actionable insights that improve your operations, we'll buy your team a case of wine. That's our confidence in the product.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-16 bg-card border border-border rounded-lg">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl text-foreground mb-2 font-semibold">Thank you!</h3>
            <p className="text-muted-foreground">We'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-12 px-4 text-foreground bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              <div>
                <label htmlFor="venue" className="block text-sm font-medium text-foreground mb-2">
                  Venue name
                </label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  required
                  value={formData.venue}
                  onChange={handleChange}
                  className="w-full h-12 px-4 text-foreground bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full h-12 px-4 text-foreground bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 px-4 text-foreground bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="headache" className="block text-sm font-medium text-foreground mb-2">
                Biggest Friday night headache? <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <textarea
                id="headache"
                name="headache"
                rows={3}
                value={formData.headache}
                onChange={handleChange}
                className="w-full px-4 py-3 text-foreground bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Join the Pilot →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
