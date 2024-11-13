export default defineAppConfig({
  toaster: {
    position: 'bottom-right' as const,
    expand: true,
    duration: 5000,
  },
  ui: {
    colors: {
      primary: 'amber',
      neutral: 'stone',
    },
    tooltip: {
      base: 'h-6 px-2 py-1 text-xs font-normal truncate relative',
    },
  },
})
