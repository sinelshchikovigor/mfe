module.exports = {
  content: [
    './packages/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.js',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
