#Environments
This scaffold is using `.env` files to set variables per environment. More info on how Vite is using those files 
to configure the variables for a specific environment can be found [here](https://vitejs.dev/guide/env-and-mode.html).

The `.env` and `.env.*` files are ignored by git to prevent sensitive information being pushed to the repository.

## Setup
To create the `.env` file, copy and rename `.env.example` or remove `.example` from `.env.example`.

`.env` will always be loaded independent on the environment. To create environment specific files please use
`.env.development`, `.env.staging` or `.env.production`.

## Adding variables
Every variable needs to be prefixed in order to be able to be exposed in the app.
The default prefix for this scaffold is set to `VAR_`.

This prefix can be changed in the `vite.config.js` file.

Whenever a new variable is added (or the prefix is changes), it should also be added/updated in `src/@type/import-meta.d.ts`. 

## Accessing variables
The specified variables can be accessed by writing for example `import.meta.env.VAR_IS_LOCALE_ENABLED`.
An example of this can be found in `./src/router/router.ts`.