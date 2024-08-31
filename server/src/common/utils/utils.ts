/**
 * Generate a random username for a guest user
 * @param prefix - The prefix for the username
 * @returns A random username
 */
export function generateGuestUsername(): string {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `Guest_${randomSuffix}`;
}
