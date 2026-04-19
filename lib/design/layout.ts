/**
 * Layout primitives — spacing follows 4 · 8 · 12 · 16 · 20 · 24 · 32 (Tailwind scale).
 * Use these strings to keep rhythm consistent across screens.
 */
export const layout = {
  page: 'mx-auto w-full max-w-xl px-5 pb-28 pt-6 sm:px-8 sm:pb-32 sm:pt-8',
  sectionY: 'space-y-6',
  headerRow: 'flex items-start justify-between gap-4',
} as const;
