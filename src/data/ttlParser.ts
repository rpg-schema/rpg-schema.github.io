import { Parser, Store, DataFactory } from 'n3';
import type { SchemaType, SchemaProperty } from './schemaTypes';

const { namedNode } = DataFactory;

const RPG_NS = 'http://www.rpg-schema.org/1.0/';
const RDFS_NS = 'http://www.w3.org/2000/01/rdf-schema#';
const RDF_NS = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const OWL_NS = 'http://www.w3.org/2002/07/owl#';
const XSD_NS = 'http://www.w3.org/2001/XMLSchema#';
const SCHEMA_NS = 'https://schema.org/';

// Helper to extract local name from URI
function getLocalName(uri: string): string {
  const hashIndex = uri.lastIndexOf('#');
  const slashIndex = uri.lastIndexOf('/');
  const index = Math.max(hashIndex, slashIndex);
  return index >= 0 ? uri.slice(index + 1) : uri;
}

// Convert types to friendly names
function formatTypeName(uri: string): string {
  const localName = getLocalName(uri);

  const xsdMap: Record<string, string> = {
    'string': 'Text',
    'integer': 'Integer',
    'decimal': 'Number',
    'boolean': 'Boolean',
    'date': 'Date',
    'dateTime': 'DateTime',
    'positiveInteger': 'Positive Integer',
    'nonNegativeInteger': 'Non-negative Integer',
  };

  if (uri.startsWith(XSD_NS)) {
    return xsdMap[localName] || localName;
  }

  if (uri.startsWith(RDFS_NS)) {
    return localName;
  }

  return localName;
}

// Assign icons based on class semantics
function assignIcon(id: string, parentId?: string): string {
  const iconMap: Record<string, string> = {
    World: '🌍',
    Tag: '🏷️',
    Actor: '🎭',
    Character: '🧙',
    Organization: '🏛️',
    Crew: '👥',
    Faction: '⚔️',
    RuleSet: '📜',
    RuleSetAttribute: '📊',
    RuleSetRace: '🧬',
    RuleSetClass: '🎓',
    ClassLevelDefinition: '📈',
    CharacterAttributeValue: '🔢',
    CharacterClassProgression: '⬆️',
    Capability: '✨',
    Spell: '🔮',
    Feature: '🌟',
    Action: '⚡',
    Proficiency: '🎯',
    SpecialAbility: '💫',
    Roll: '🎲',
    ResolutionModel: '⚙️',
    D20Model: '🎲',
    DicePoolModel: '🎲',
    RollSignal: '📡',
    SignalRole: '🔄',
    PrimaryRole: '1️⃣',
    SideEffectRole: '2️⃣',
    RollEvaluation: '📐',
    State: '🔰',
    Condition: '⚠️',
    Harm: '💔',
    AppliedState: '🩹',
    Tracker: '📊',
    ReputationTracker: '⭐',
    TrackerInstance: '📉',
    TemporalEntity: '⏳',
    Session: '📅',
    Scene: '🎬',
    Phase: '🔄',
    Clock: '🕐',
    ClockInstance: '⏱️',
    Relationship: '🤝',
    Item: '🗡️',
    ItemInstance: '🎒',
    AdvancementRule: '📖',
    Unlock: '🔓',
    FictionKnob: '🎛️',
    RiskPosition: '⚠️',
    EffectLevel: '💥',
    Consequence: '💀',
    RollModifier: '➕',
  };

  return iconMap[id] || '📦';
}

export function parseTurtleToSchemaTypes(ttlContent: string): SchemaType[] {
  const parser = new Parser();
  const store = new Store();

  const quads = parser.parse(ttlContent);
  store.addQuads(quads);

  const schemaTypes: SchemaType[] = [];
  const classMap = new Map<string, SchemaType>();

  // Find all OWL classes in the RPG namespace
  const owlClassQuads = store.getQuads(null, namedNode(RDF_NS + 'type'), namedNode(OWL_NS + 'Class'), null);

  for (const quad of owlClassQuads) {
    const classUri = quad.subject.value;
    if (!classUri.startsWith(RPG_NS)) continue;

    const id = getLocalName(classUri);

    // Get label
    const labelQuads = store.getQuads(namedNode(classUri), namedNode(RDFS_NS + 'label'), null, null);
    const name = labelQuads[0]?.object.value || id;

    // Get comment/description
    const commentQuads = store.getQuads(namedNode(classUri), namedNode(RDFS_NS + 'comment'), null, null);
    const description = (commentQuads[0]?.object.value || '').trim();

    // Get parent class (prefer rpg: namespace parents)
    const subClassQuads = store.getQuads(namedNode(classUri), namedNode(RDFS_NS + 'subClassOf'), null, null);
    let parent: string | undefined;
    for (const sc of subClassQuads) {
      const parentUri = sc.object.value;
      if (parentUri.startsWith(RPG_NS)) {
        parent = getLocalName(parentUri);
        break;
      }
    }

    const icon = assignIcon(id, parent);

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

  // Build subTypes relationships
  for (const schemaType of schemaTypes) {
    if (schemaType.parent) {
      const parentType = classMap.get(schemaType.parent);
      if (parentType && parentType.subTypes) {
        parentType.subTypes.push(schemaType.id);
      }
    }
  }

  // Find all OWL properties (ObjectProperty + DatatypeProperty)
  const propTypes = [
    namedNode(OWL_NS + 'ObjectProperty'),
    namedNode(OWL_NS + 'DatatypeProperty'),
  ];

  for (const propType of propTypes) {
    const propertyQuads = store.getQuads(null, namedNode(RDF_NS + 'type'), propType, null);

    for (const quad of propertyQuads) {
      const propUri = quad.subject.value;
      if (!propUri.startsWith(RPG_NS)) continue;

      // Get label
      const labelQuads = store.getQuads(namedNode(propUri), namedNode(RDFS_NS + 'label'), null, null);
      const name = labelQuads[0]?.object.value || getLocalName(propUri);

      // Get comment/description
      const commentQuads = store.getQuads(namedNode(propUri), namedNode(RDFS_NS + 'comment'), null, null);
      const description = (commentQuads[0]?.object.value || '').trim();

      // Get domain
      const domainQuads = store.getQuads(namedNode(propUri), namedNode(RDFS_NS + 'domain'), null, null);

      // Get range
      const rangeQuads = store.getQuads(namedNode(propUri), namedNode(RDFS_NS + 'range'), null, null);
      const expectedType = rangeQuads.map(q => formatTypeName(q.object.value));

      const isObjectProp = propType.value === OWL_NS + 'ObjectProperty';

      const property: SchemaProperty = {
        name,
        expectedType: expectedType.length > 0 ? expectedType : [isObjectProp ? 'Thing' : 'Text'],
        description,
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
  }

  // Remove empty subTypes arrays
  for (const schemaType of schemaTypes) {
    if (schemaType.subTypes && schemaType.subTypes.length === 0) {
      delete schemaType.subTypes;
    }
  }

  // Sort: top-level parents first, then alphabetically
  schemaTypes.sort((a, b) => {
    // Root types (no rpg parent) first
    const aIsRoot = !a.parent;
    const bIsRoot = !b.parent;
    if (aIsRoot && !bIsRoot) return -1;
    if (!aIsRoot && bIsRoot) return 1;
    // Then by name
    return a.name.localeCompare(b.name);
  });

  return schemaTypes;
}
