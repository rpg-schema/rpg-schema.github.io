import { parseTurtleToSchemaTypes } from './ttlParser';
import ttlContent from './rpg-schema.ttl?raw';

export interface SchemaProperty {
  name: string;
  expectedType: string[];
  description: string;
  required?: boolean;
}

export interface SchemaType {
  id: string;
  name: string;
  description: string;
  parent?: string;
  properties: SchemaProperty[];
  subTypes?: string[];
  icon: string;
}

// Parse the TTL file to get schema types
export const schemaTypes: SchemaType[] = parseTurtleToSchemaTypes(ttlContent);

export const getTypeById = (id: string): SchemaType | undefined => {
  return schemaTypes.find(type => type.id === id);
};

export const getTypeHierarchy = (id: string): SchemaType[] => {
  const hierarchy: SchemaType[] = [];
  let current = getTypeById(id);
  
  while (current) {
    hierarchy.unshift(current);
    current = current.parent ? getTypeById(current.parent) : undefined;
  }
  
  return hierarchy;
};

// Export the raw TTL content for download/display
export const getRawTTL = (): string => ttlContent;
