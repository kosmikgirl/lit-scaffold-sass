## Adding SASS to a Project

Install SASS following these steps:

- Install packages `npm install rollup-plugin-postcss-lit sass -save-dev`.
- In the `vite.config.js` file add `import litcss from 'rollup-plugin-postcss-lit';`, and add `litcss()` as a plugin.
- Import .scss .sass files in the component file `import styles from './styles.scss';`.
- Set the styles within the class `static styles = [styles, css''];`.

**WARNING: Lit doesn't support SASS natively, so introducing it could lead to unforseen issues**
