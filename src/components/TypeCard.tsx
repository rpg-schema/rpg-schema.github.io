import { SchemaType } from "@/data/schemaTypes";

interface TypeCardProps {
  type: SchemaType;
  onClick: (type: SchemaType) => void;
}

const TypeCard = ({ type, onClick }: TypeCardProps) => {
  return (
    <button
      onClick={() => onClick(type)}
      className="group w-full text-left p-6 bg-card rounded-xl border border-border shadow-card hover:shadow-elevated hover:border-primary/40 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          {type.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
            {type.name}
          </h3>
          {type.parent && (
            <div className="text-xs text-muted-foreground mb-2">
              extends <span className="text-accent font-medium">{type.parent}</span>
            </div>
          )}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {type.description}
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="type-badge">
              {type.properties.length} properties
            </span>
            {type.subTypes && type.subTypes.length > 0 && (
              <span className="type-badge">
                {type.subTypes.length} subtypes
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default TypeCard;
