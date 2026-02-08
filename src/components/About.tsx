const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-parchment-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            About RPG-Schema.org
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card p-6 rounded-xl border border-border shadow-card">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                Our Mission
              </h3>
              <p className="text-muted-foreground">
                To create a universal, open vocabulary for describing all aspects of tabletop 
                roleplaying games, enabling interoperability between character sheets, virtual 
                tabletops, game databases, and digital tools.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border border-border shadow-card">
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                Based on Schema.org
              </h3>
              <p className="text-muted-foreground">
                RPG-Schema.org extends the widely-adopted Schema.org vocabulary, ensuring 
                compatibility with existing semantic web infrastructure while adding 
                RPG-specific types and properties.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border border-border shadow-card">
              <div className="text-3xl mb-4">🎲</div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                System Agnostic
              </h3>
              <p className="text-muted-foreground">
                Designed to work with any tabletop RPG system—from D&D and Pathfinder to 
                Call of Cthulhu, FATE, and homebrew systems. The vocabulary is flexible 
                enough to accommodate diverse mechanics.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border border-border shadow-card">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                Community Driven
              </h3>
              <p className="text-muted-foreground">
                RPG-Schema.org is developed openly with input from game designers, 
                developers, and the RPG community. Contributions and feedback are 
                always welcome.
              </p>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-card p-8 rounded-xl border border-border shadow-card">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6 text-center">
              Use Cases
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: "📋", text: "Digital character sheets" },
                { icon: "🖥️", text: "Virtual tabletop platforms" },
                { icon: "📚", text: "Game content databases" },
                { icon: "🔄", text: "Character import/export" },
                { icon: "🤖", text: "AI game assistants" },
                { icon: "📊", text: "Campaign management tools" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
