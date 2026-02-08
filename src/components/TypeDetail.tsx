import { SchemaType, getTypeHierarchy } from "@/data/schemaTypes";
import { X } from "lucide-react";

interface TypeDetailProps {
  type: SchemaType;
  onClose: () => void;
  onTypeClick: (typeId: string) => void;
}

const TypeDetail = ({ type, onClose, onTypeClick }: TypeDetailProps) => {
  const hierarchy = getTypeHierarchy(type.id);

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevated overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-parchment border-b border-border p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{type.icon}</span>
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground">
                {type.name}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                {hierarchy.map((h, i) => (
                  <span key={h.id} className="flex items-center gap-2">
                    {i > 0 && <span className="text-border">›</span>}
                    <button
                      onClick={() => onTypeClick(h.id)}
                      className={`hover:text-accent transition-colors ${h.id === type.id ? 'text-foreground font-medium' : 'text-accent'}`}
                    >
                      {h.name}
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="mt-4 text-muted-foreground">
          {type.description}
        </p>
      </div>

      {/* Properties */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-foreground mb-4">
          Properties
        </h3>
        
        <div className="overflow-x-auto">
          <table className="property-table">
            <thead>
              <tr>
                <th className="rounded-tl-lg">Property</th>
                <th>Expected Type</th>
                <th className="rounded-tr-lg">Description</th>
              </tr>
            </thead>
            <tbody>
              {type.properties.map((prop, i) => (
                <tr key={prop.name} className={i % 2 === 0 ? 'bg-secondary/20' : ''}>
                  <td className="font-mono text-sm">
                    <span className="text-foreground font-medium">{prop.name}</span>
                    {prop.required && (
                      <span className="ml-2 text-dice-red text-xs">required</span>
                    )}
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {prop.expectedType.map((t) => (
                        <span key={t} className="type-badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="text-sm text-muted-foreground">
                    {prop.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subtypes */}
      {type.subTypes && type.subTypes.length > 0 && (
        <div className="p-6 pt-0">
          <h3 className="font-heading text-xl font-bold text-foreground mb-4">
            More Specific Types
          </h3>
          <div className="flex flex-wrap gap-2">
            {type.subTypes.map((subType) => (
              <button
                key={subType}
                onClick={() => onTypeClick(subType)}
                className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {subType}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* JSON-LD Example */}
      <div className="p-6 pt-0">
        <h3 className="font-heading text-xl font-bold text-foreground mb-4">
          Example (JSON-LD)
        </h3>
        <pre className="bg-brown text-parchment p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`{
  "@context": "https://rpg-schema.org",
  "@type": "${type.name}",
  "name": "Example ${type.name}",
  ${type.properties.slice(0, 3).map(p => `"${p.name}": "..."`).join(',\n  ')}
}`}
        </pre>
      </div>
    </div>
  );
};

export default TypeDetail;
