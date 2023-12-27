import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';

export default {
  input: 'app/app.js', // Replace with your main JavaScript file
  output: {
    file: 'dist/app.js',
    format: 'iife'
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
    copy({
      targets: [
        { src: 'app/styles.css', dest: 'dist' } // Adjust the path to your CSS file
      ]
    })
  ]
};
