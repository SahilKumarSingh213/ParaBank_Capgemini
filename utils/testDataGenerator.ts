// generates a unique username using timestamp to avoid duplicate username errors
export function generateUsername(): string {
  return `sahil_${Date.now()}`;
}