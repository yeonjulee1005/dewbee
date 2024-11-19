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
    modal: {
      variants: {
        fullscreen: {
          false: {
            content: 'max-w-lg w-[90vw] h-auto rounded-[calc(var(--ui-radius)*2)] shadow-lg ring',
          },
        },
      },
    },
  },
})
