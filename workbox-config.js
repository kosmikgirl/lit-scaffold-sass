module.exports = {
  globDirectory: './',
  globPatterns: ['**/*.{html,ts,js,svg}'],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swDest: 'build/service-worker.js',
};
