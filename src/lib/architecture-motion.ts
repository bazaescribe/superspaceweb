/** Shared settling rate for architecture layer emphasis across renderers. */
export const architectureMotion = { response: 9, duration: 0.5 } as const;

export function architectureBlend(delta: number, reducedMotion: boolean) {
  return reducedMotion ? 1 : 1 - Math.exp(-delta * architectureMotion.response);
}
