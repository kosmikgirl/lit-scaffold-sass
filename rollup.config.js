import html from '@web/rollup-plugin-html';
import {copy} from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';

export default commandLineArgs => {
  const {isPwa} = commandLineArgs;

  isPwa &&
    console.log(
      '\x1b[32m',
      `>> You are running the PWA build process.
       >> Your build will containt a service worker to provide the necessary behavior.`
    );

  const config = {
    plugins: [
      typescript(),
      resolve(),
      minifyHTML(),
      terser({
        ecma: 2020,
        module: true,
        warnings: true,
      }),
      copy({
        patterns: ['asset/**/*', 'robots.txt'],
        rootDir: './src',
      }),
      summary(),
      replace({
        // change the value to 'development' if you want to log more errors once built.
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    ],
    output: {
      dir: 'build',
    },
    preserveEntrySignatures: 'strict',
  };

  let htmlConfig = {
    input: 'index.html',
    minify: true,
    extractAssets: false,
    transformHtml: [html => html.replaceAll('href="/src', 'href="')],
  };

  if (isPwa) {
    htmlConfig = {
      ...htmlConfig,
      transformHtml: [
        ...htmlConfig.transformHtml,
        html =>
          html.replace(
            '<head>',
            '<head><link rel="manifest" crossorigin="use-credentials" href="manifest.json">'
          ),
      ],
    };

    config.plugins.push(
      copy({
        patterns: 'manifest.json',
      })
    );
  }

  config.plugins.unshift(html(htmlConfig));

  return config;
};
