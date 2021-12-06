import html from '@web/rollup-plugin-html';
import {copy} from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import summary from 'rollup-plugin-summary';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import del from 'rollup-plugin-delete';
import imagemin from 'rollup-plugin-imagemin';
import imageminWebp from 'imagemin-webp';

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
      del({targets: 'build/*'}),
      replace({
        // change the value to 'development' if you want to log more errors once built.
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true
      }),
      typescript(),
      resolve(),
      terser({
        ecma: 2020,
        module: true,
        warnings: true,
      }),
      imagemin({
        preserveTree: true,
        imageminWebp: {
          quality: 50,
        },
        plugins: {
          imageminWebp,
        },
      }),
      copy({
        patterns: ['./static/**/*', './src/robots.txt'],
      }),
      summary(),
    ],
    preserveEntrySignatures: 'strict',
    input: './src/lit-scaffold.ts',
    output: {
      dir: 'build',
      format: 'cjs',
    }
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
