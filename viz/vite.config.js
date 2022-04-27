export default {
  optimizeDeps: {
    include: ["dist"],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /dist/],
    },
  },
};
