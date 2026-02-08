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

export const schemaTypes: SchemaType[] = [
  {
    id: "Thing",
    name: "Thing",
    description: "The most generic type of item in the RPG ontology.",
    icon: "📦",
    properties: [
      { name: "name", expectedType: ["Text"], description: "The name of the item.", required: true },
      { name: "description", expectedType: ["Text"], description: "A description of the item." },
      { name: "identifier", expectedType: ["Text", "URL"], description: "A unique identifier for the item." },
      { name: "url", expectedType: ["URL"], description: "URL of the item." },
      { name: "image", expectedType: ["ImageObject", "URL"], description: "An image of the item." },
    ],
    subTypes: ["Character", "Item", "Spell", "Creature", "Campaign", "GameSystem", "Location", "Action"],
  },
  {
    id: "Character",
    name: "Character",
    description: "A player character or non-player character in a roleplaying game.",
    parent: "Thing",
    icon: "🧙",
    properties: [
      { name: "characterClass", expectedType: ["CharacterClass"], description: "The class or classes of the character.", required: true },
      { name: "level", expectedType: ["Integer"], description: "The current level of the character." },
      { name: "race", expectedType: ["Race", "Text"], description: "The race or ancestry of the character." },
      { name: "alignment", expectedType: ["Alignment", "Text"], description: "The moral and ethical alignment of the character." },
      { name: "hitPoints", expectedType: ["Integer"], description: "Current and maximum hit points." },
      { name: "abilityScores", expectedType: ["AbilityScoreSet"], description: "The character's ability scores (STR, DEX, CON, INT, WIS, CHA)." },
      { name: "inventory", expectedType: ["Item"], description: "Items carried by the character." },
      { name: "spellsKnown", expectedType: ["Spell"], description: "Spells the character knows or has prepared." },
      { name: "background", expectedType: ["Background", "Text"], description: "The character's background story or archetype." },
      { name: "player", expectedType: ["Person"], description: "The player who controls this character." },
    ],
    subTypes: ["PlayerCharacter", "NonPlayerCharacter"],
  },
  {
    id: "Item",
    name: "Item",
    description: "A physical or magical object that can be used, worn, or carried.",
    parent: "Thing",
    icon: "⚔️",
    properties: [
      { name: "itemType", expectedType: ["ItemCategory"], description: "The category of item (weapon, armor, consumable, etc.).", required: true },
      { name: "rarity", expectedType: ["Rarity", "Text"], description: "The rarity level of the item." },
      { name: "weight", expectedType: ["QuantitativeValue"], description: "The weight of the item." },
      { name: "value", expectedType: ["MonetaryAmount"], description: "The monetary value of the item." },
      { name: "magicalProperties", expectedType: ["Text"], description: "Any magical properties or enchantments." },
      { name: "attunement", expectedType: ["Boolean"], description: "Whether the item requires attunement." },
      { name: "damage", expectedType: ["DamageExpression"], description: "Damage dealt by the item (if weapon)." },
      { name: "armorClass", expectedType: ["Integer"], description: "Armor class provided (if armor)." },
    ],
    subTypes: ["Weapon", "Armor", "Potion", "Scroll", "WondrousItem"],
  },
  {
    id: "Spell",
    name: "Spell",
    description: "A magical effect that can be cast by characters with spellcasting abilities.",
    parent: "Thing",
    icon: "✨",
    properties: [
      { name: "spellLevel", expectedType: ["Integer"], description: "The level of the spell (0 for cantrips).", required: true },
      { name: "school", expectedType: ["MagicSchool"], description: "The school of magic (Evocation, Necromancy, etc.).", required: true },
      { name: "castingTime", expectedType: ["Duration", "Text"], description: "Time required to cast the spell." },
      { name: "range", expectedType: ["Distance", "Text"], description: "The range of the spell." },
      { name: "components", expectedType: ["SpellComponent"], description: "Required components (V, S, M)." },
      { name: "duration", expectedType: ["Duration", "Text"], description: "How long the spell effect lasts." },
      { name: "concentration", expectedType: ["Boolean"], description: "Whether the spell requires concentration." },
      { name: "ritual", expectedType: ["Boolean"], description: "Whether the spell can be cast as a ritual." },
      { name: "damageType", expectedType: ["DamageType"], description: "Type of damage dealt, if any." },
      { name: "savingThrow", expectedType: ["AbilityType"], description: "The ability score used for saving throws." },
    ],
  },
  {
    id: "Creature",
    name: "Creature",
    description: "A monster, beast, or other entity that characters may encounter.",
    parent: "Thing",
    icon: "🐉",
    properties: [
      { name: "creatureType", expectedType: ["CreatureCategory"], description: "The type of creature (Beast, Dragon, Undead, etc.).", required: true },
      { name: "challengeRating", expectedType: ["Number", "Text"], description: "The challenge rating indicating difficulty.", required: true },
      { name: "size", expectedType: ["CreatureSize"], description: "The size category of the creature." },
      { name: "hitPoints", expectedType: ["Integer", "DiceExpression"], description: "Hit points of the creature." },
      { name: "armorClass", expectedType: ["Integer"], description: "The armor class of the creature." },
      { name: "speed", expectedType: ["SpeedSet"], description: "Movement speeds (walking, flying, swimming, etc.)." },
      { name: "abilityScores", expectedType: ["AbilityScoreSet"], description: "The creature's ability scores." },
      { name: "actions", expectedType: ["Action"], description: "Actions the creature can take." },
      { name: "legendaryActions", expectedType: ["Action"], description: "Legendary actions, if any." },
      { name: "resistances", expectedType: ["DamageType"], description: "Damage types the creature resists." },
      { name: "immunities", expectedType: ["DamageType", "Condition"], description: "Damage types or conditions the creature is immune to." },
    ],
  },
  {
    id: "Campaign",
    name: "Campaign",
    description: "An ongoing series of connected game sessions with a continuing story.",
    parent: "Thing",
    icon: "📜",
    properties: [
      { name: "gameSystem", expectedType: ["GameSystem"], description: "The game system used for the campaign.", required: true },
      { name: "gameMaster", expectedType: ["Person"], description: "The person running the campaign." },
      { name: "players", expectedType: ["Person"], description: "Players participating in the campaign." },
      { name: "characters", expectedType: ["Character"], description: "Player characters in the campaign." },
      { name: "setting", expectedType: ["GameWorld", "Text"], description: "The world or setting of the campaign." },
      { name: "sessions", expectedType: ["GameSession"], description: "Individual game sessions." },
      { name: "startDate", expectedType: ["Date"], description: "When the campaign began." },
      { name: "status", expectedType: ["CampaignStatus"], description: "Whether the campaign is active, paused, or completed." },
    ],
  },
  {
    id: "GameSystem",
    name: "GameSystem",
    description: "A roleplaying game system with its own rules and mechanics.",
    parent: "Thing",
    icon: "🎲",
    properties: [
      { name: "publisher", expectedType: ["Organization"], description: "The publisher of the game system." },
      { name: "edition", expectedType: ["Text"], description: "The edition or version of the system." },
      { name: "genre", expectedType: ["Text"], description: "The genre (fantasy, sci-fi, horror, etc.)." },
      { name: "coreMechanic", expectedType: ["Text"], description: "The core dice/resolution mechanic." },
      { name: "license", expectedType: ["Text", "URL"], description: "The license under which the system is published." },
    ],
  },
  {
    id: "Location",
    name: "Location",
    description: "A place within the game world that characters can visit or explore.",
    parent: "Thing",
    icon: "🏰",
    properties: [
      { name: "locationType", expectedType: ["LocationCategory"], description: "The type of location (dungeon, city, wilderness, etc.)." },
      { name: "containedIn", expectedType: ["Location"], description: "The larger location this is part of." },
      { name: "contains", expectedType: ["Location"], description: "Smaller locations within this one." },
      { name: "inhabitants", expectedType: ["Creature", "Character"], description: "Creatures or characters found here." },
      { name: "treasures", expectedType: ["Item"], description: "Notable items that can be found here." },
      { name: "dangerLevel", expectedType: ["Integer", "Text"], description: "How dangerous the location is." },
    ],
  },
  {
    id: "Action",
    name: "Action",
    description: "An action that can be taken by a character or creature during gameplay.",
    parent: "Thing",
    icon: "⚡",
    properties: [
      { name: "actionType", expectedType: ["ActionCategory"], description: "The type of action (attack, spell, ability, etc.)." },
      { name: "actionCost", expectedType: ["ActionCost"], description: "The action economy cost (action, bonus action, reaction)." },
      { name: "range", expectedType: ["Distance", "Text"], description: "The range of the action." },
      { name: "target", expectedType: ["TargetType"], description: "What can be targeted by this action." },
      { name: "effect", expectedType: ["Text"], description: "The effect of the action." },
      { name: "damage", expectedType: ["DamageExpression"], description: "Damage dealt, if any." },
      { name: "savingThrow", expectedType: ["SavingThrow"], description: "Required saving throw, if any." },
      { name: "recharge", expectedType: ["RechargeCondition"], description: "How the action recharges (if limited use)." },
    ],
  },
];

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
