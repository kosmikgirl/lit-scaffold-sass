import html from '@web/rollup-plugin-html';
import {copy} from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';

export default {
  plugins: [
    html({
      input: 'index.html',
      minify: true,
      // As we are not extracting the HTML-referenced assets (we copy the whole 'asset' folder insted),
      // we have to change their href path to reflect what ends up in the build.
      extractAssets: false,
      transformHtml: [html => html.replaceAll('/src', '')],
    }),
    typescript(),
    resolve(),
    minifyHTML(),
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
    copy({
      patterns: ['asset/**/*'],
      rootDir: './src',
    }),
    summary(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  output: {
    dir: 'build',
  },
  preserveEntrySignatures: 'strict',
};
