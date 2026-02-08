import logo from "@/assets/rpg-schema-logo.png";

const Hero = () => {
  return (
    <section className="bg-gradient-parchment py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8 animate-fade-in">
          <img 
            src={logo} 
            alt="RPG-Schema.org" 
            className="mx-auto h-40 md:h-56 w-auto drop-shadow-lg"
          />
        </div>
        
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          The Super-Ontology for <span className="text-gold">Roleplaying Games</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          A Schema.org-based vocabulary for describing characters, items, spells, creatures, 
          campaigns, and all elements of tabletop roleplaying games in a structured, interoperable format.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <a 
            href="#schemas" 
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-gold text-primary-foreground font-heading font-semibold rounded-lg shadow-elevated hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            Explore Schemas
          </a>
          <a 
            href="#about" 
            className="inline-flex items-center justify-center px-8 py-3 bg-card text-foreground font-heading font-semibold rounded-lg border border-border shadow-card hover:border-primary/50 transition-all duration-300"
          >
            Learn More
          </a>
        </div>
        
        <div className="mt-12 flex items-center justify-center gap-8 text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-foreground">9+</div>
            <div className="text-sm">Core Types</div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-foreground">80+</div>
            <div className="text-sm">Properties</div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-foreground">Open</div>
            <div className="text-sm">Source</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
