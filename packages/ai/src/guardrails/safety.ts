/**
 * Contains simple content safety checks for AI responses.  In a production system these
 * functions would call out to a moderation API or use more advanced heuristics.  Here
 * we implement basic keyword filtering to illustrate the concept.
 */
const bannedKeywords = ['violence', 'hate', 'explicit'];

/**
 * Returns true if the given text contains disallowed content.
 */
export function isContentUnsafe(text: string): boolean {
  return bannedKeywords.some((kw) => text.toLowerCase().includes(kw));
}

/**
 * Applies simple age gating by checking the user’s age against the minimum age.
 */
export function isUnderAge(userAge: number, minimumAge = 13): boolean {
  return userAge < minimumAge;
}