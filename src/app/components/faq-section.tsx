export function FAQSection() {
  const faqs = [
    {
      question: "How does this work with my existing POS system?",
      answer: "Sentra doesn't integrate with your POS. When a guest shows their redemption code, you simply apply the discount manually. It's that simple."
    },
    {
      question: "What if guests reserve but don't show up?",
      answer: "Reservations automatically expire after 2 hours. If guests don't redeem their code, the reservation releases and they keep their $1-2 fee. This protects you from no-shows."
    },
    {
      question: "How much does the pilot cost?",
      answer: "The pilot is completely free. No setup fees, no monthly costs, no hardware to buy. We only succeed when you see value."
    },
    {
      question: "Can I set any item I want?",
      answer: "Yes! You choose what to feature each night. Popular options include house cocktails, wine by the glass, or daily specials."
    },
    {
      question: "What happens after the 30-day pilot?",
      answer: "If you love the insights and want to continue, we'll discuss pricing. If not, no hard feelings – you keep all the data and insights from the pilot."
    },
    {
      question: "How do I know if guests will actually use this?",
      answer: "That's exactly what the pilot is for! We've seen 15-25% of menu viewers reserve in early tests, but every venue is different."
    }
  ];

  return (
    <section className="py-20 md:py-32 px-6 bg-card border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold mb-6 leading-tight tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about Sentra and the pilot program
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-background border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3 leading-tight">
                {faq.question}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 max-w-lg mx-auto">
            <h3 className="text-foreground font-semibold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">
              We'd love to chat about how Sentra could work for your venue.
            </p>
            <a 
              href="mailto:hello@sentra.so" 
              className="text-primary font-medium hover:text-primary/90 transition-colors"
            >
              Email us at hello@sentra.so
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}