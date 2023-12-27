import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';

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
    copy({
      targets: [
        { src: 'src/styles.css', dest: 'dist' }, // Adjust the path to your CSS file
      ],
    }),
  ],
};