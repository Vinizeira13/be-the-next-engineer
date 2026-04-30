import factsData from "../../data/facts.json"

export type Fact = (typeof factsData.facts)[number]

export const FACTS = factsData.facts as readonly Fact[]
export const FACTS_VERSION = factsData.version
export const FACTS_SOURCE = factsData.source

/**
 * Compact serialization of facts for inclusion in the system prompt.
 * Keep this terse — every token here is in every mentor request.
 */
export function factsForPrompt(): string {
  return FACTS.map((f) => `- [${f.id}] ${f.claim}`).join("\n")
}
