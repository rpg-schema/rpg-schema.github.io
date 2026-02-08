import { Parser, Store, DataFactory } from 'n3';
import type { SchemaType, SchemaProperty } from './schemaTypes';

const { namedNode } = DataFactory;

const RPG_NS = 'https://rpg-schema.org/';
const RDFS_NS = 'http://www.w3.org/2000/01/rdf-schema#';
const RDF_NS = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const XSD_NS = 'http://www.w3.org/2001/XMLSchema#';

// Helper to extract local name from URI
function getLocalName(uri: string): string {
  const hashIndex = uri.lastIndexOf('#');
  const slashIndex = uri.lastIndexOf('/');
  const index = Math.max(hashIndex, slashIndex);
  return index >= 0 ? uri.slice(index + 1) : uri;
}

// Convert XSD types to friendly names
function formatTypeName(uri: string): string {
  const localName = getLocalName(uri);
  
  // Map XSD types to friendly names
  const xsdMap: Record<string, string> = {
    'string': 'Text',
    'integer': 'Integer',
    'decimal': 'Number',
    'boolean': 'Boolean',
    'date': 'Date',
    'dateTime': 'DateTime',
  };
  
  if (uri.startsWith(XSD_NS)) {
    return xsdMap[localName] || localName;
  }
  
  // Handle schema.org types
  if (uri.includes('schema.org')) {
    return localName;
  }
  
  return localName;
}

export function parseTurtleToSchemaTypes(ttlContent: string): SchemaType[] {
  const parser = new Parser();
  const store = new Store();
  
  // Parse the TTL content
  const quads = parser.parse(ttlContent);
  store.addQuads(quads);
  
  const schemaTypes: SchemaType[] = [];
  const classMap = new Map<string, SchemaType>();
  
  // First pass: Find all classes
  const classQuads = store.getQuads(null, namedNode(RDF_NS + 'type'), namedNode(RDFS_NS + 'Class'), null);
  
  for (const quad of classQuads) {
    const classUri = quad.subject.value;
    if (!classUri.startsWith(RPG_NS)) continue;
    
    const id = getLocalName(classUri);
    
    // Get label
    const labelQuads = store.getQuads(namedNode(classUri), namedNode(RDFS_NS + 'label'), null, null);
    const name = labelQuads[0]?.object.value || id;
    
    // Get comment/description
    const commentQuads = store.getQuads(namedNode(classUri), namedNode(RDFS_NS + 'comment'), null, null);
    const description = commentQuads[0]?.object.value || '';
    
    // Get parent class
    const subClassQuads = store.getQuads(namedNode(classUri), namedNode(RDFS_NS + 'subClassOf'), null, null);
    const parentUri = subClassQuads[0]?.object.value;
    const parent = parentUri && parentUri.startsWith(RPG_NS) ? getLocalName(parentUri) : undefined;
    
    // Get icon
    const iconQuads = store.getQuads(namedNode(classUri), namedNode(RPG_NS + 'icon'), null, null);
    const icon = iconQuads[0]?.object.value || '📦';
    
    const schemaType: SchemaType = {
      id,
      name,
      description,
      parent,
      icon,
      properties: [],
      subTypes: [],
    };
    
    classMap.set(id, schemaType);
    schemaTypes.push(schemaType);
  }
  
  // Second pass: Build subTypes relationships
  for (const schemaType of schemaTypes) {
    if (schemaType.parent) {
      const parentType = classMap.get(schemaType.parent);
      if (parentType && parentType.subTypes) {
        parentType.subTypes.push(schemaType.id);
      }
    }
  }
  
  // Third pass: Find all properties and assign to classes
  const propertyQuads = store.getQuads(null, namedNode(RDF_NS + 'type'), namedNode(RDF_NS + 'Property'), null);
  
  for (const quad of propertyQuads) {
    const propUri = quad.subject.value;
    if (!propUri.startsWith(RPG_NS)) continue;
    
    const propName = getLocalName(propUri);
    
    // Get label
    const labelQuads = store.getQuads(namedNode(propUri), namedNode(RDFS_NS + 'label'), null, null);
    const name = labelQuads[0]?.object.value || propName;
    
    // Get comment/description
    const commentQuads = store.getQuads(namedNode(propUri), namedNode(RDFS_NS + 'comment'), null, null);
    const description = commentQuads[0]?.object.value || '';
    
    // Get domain (which class this property belongs to)
    const domainQuads = store.getQuads(namedNode(propUri), namedNode(RDFS_NS + 'domain'), null, null);
    
    // Get range (expected types)
    const rangeQuads = store.getQuads(namedNode(propUri), namedNode(RDFS_NS + 'range'), null, null);
    const expectedType = rangeQuads.map(q => formatTypeName(q.object.value));
    
    // Check if required
    const requiredQuads = store.getQuads(namedNode(propUri), namedNode(RPG_NS + 'required'), null, null);
    const required = requiredQuads[0]?.object.value === 'true';
    
    const property: SchemaProperty = {
      name,
      expectedType: expectedType.length > 0 ? expectedType : ['Text'],
      description,
      required: required || undefined,
    };
    
    // Add property to each domain class
    for (const domainQuad of domainQuads) {
      const domainUri = domainQuad.object.value;
      if (!domainUri.startsWith(RPG_NS)) continue;
      
      const domainId = getLocalName(domainUri);
      const schemaType = classMap.get(domainId);
      
      if (schemaType) {
        schemaType.properties.push(property);
      }
    }
  }
  
  // Remove empty subTypes arrays
  for (const schemaType of schemaTypes) {
    if (schemaType.subTypes && schemaType.subTypes.length === 0) {
      delete schemaType.subTypes;
    }
  }
  
  // Sort types: Thing first, then alphabetically by name
  schemaTypes.sort((a, b) => {
    if (a.id === 'Thing') return -1;
    if (b.id === 'Thing') return 1;
    // Direct children of Thing come before grandchildren
    const aIsDirectChild = a.parent === 'Thing';
    const bIsDirectChild = b.parent === 'Thing';
    if (aIsDirectChild && !bIsDirectChild) return -1;
    if (!aIsDirectChild && bIsDirectChild) return 1;
    return a.name.localeCompare(b.name);
  });
  
  return schemaTypes;
}
