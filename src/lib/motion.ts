export const motionEase = [0.22, 0.86, 0.24, 1] as const;

export const motion = {
  fast: { duration: 0.18, ease: motionEase },
  standard: { duration: 0.28, ease: motionEase },
  featured: { duration: 0.42, ease: motionEase },
  layout: { type: "spring", stiffness: 340, damping: 30, mass: 0.58 },
  accordionExit: 0.18,
  accordionEnterDelay: 0.08,
} as const;
