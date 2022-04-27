export default defineConfig({
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
