import { useState } from "react";
import { schemaTypes, SchemaType, getTypeById } from "@/data/schemaTypes";
import TypeCard from "./TypeCard";
import TypeDetail from "./TypeDetail";
import { Search } from "lucide-react";

const SchemaExplorer = () => {
  const [selectedType, setSelectedType] = useState<SchemaType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTypes = schemaTypes.filter(type => 
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTypeClick = (type: SchemaType) => {
    setSelectedType(type);
    // Scroll to detail view
    setTimeout(() => {
      document.getElementById('type-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleTypeIdClick = (typeId: string) => {
    const type = getTypeById(typeId);
    if (type) {
      setSelectedType(type);
    }
  };

  return (
    <section id="schemas" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Schema Types
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse the core vocabulary types that make up the RPG-Schema.org ontology.
            Each type extends from <span className="schema-link">Thing</span> and defines properties specific to roleplaying games.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search schema types..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Type Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTypes.map((type, index) => (
            <div
              key={type.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <TypeCard type={type} onClick={handleTypeClick} />
            </div>
          ))}
        </div>

        {filteredTypes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No schema types found matching "{searchQuery}"</p>
          </div>
        )}

        {/* Type Detail */}
        {selectedType && (
          <div id="type-detail" className="mt-8 animate-fade-in">
            <TypeDetail
              type={selectedType}
              onClose={() => setSelectedType(null)}
              onTypeClick={handleTypeIdClick}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default SchemaExplorer;
