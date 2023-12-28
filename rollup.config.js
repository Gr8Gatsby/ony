import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss'; // Import the CSS-only plugin

const production = process.env.NODE_ENV === 'production';

export default {
  input: 'src/main.js', // Specify the entry point for your JavaScript
  output: {
    file: 'dist/app.js', // Output file location and name
    format: 'iife', // IIFE format for browsers
    name: 'ONY', // Replace with your app name
  },
  plugins: [
    production && terser(),
    resolve(),
    babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
    postcss({ extract: 'styles.css', minimize: production }), // Minify CSS and output to dist/styles.css
  ],
};
