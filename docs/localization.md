# Localization

The localization is set up with [Lit Localize](https://lit.dev/docs/localization/overview/).

Please follow the instructions on that page for adding localization to components.

## Configuration

The configuration is done in the `lit-localize.json` in the root of the project.

There are 2 properties that can be changed:

1. `sourceLocale` This is the locale that will be set by default
2. `targetLocales` This is a list of all available locales for the project

```json
{
  ...
  "sourceLocale": "en",
  "targetLocales": ["es-419", "zh-Hans"],
  ...
}
```

To enable the localization please set `VariablesNames.IS_LOCALE_ENABLED` in `src/config/config.ts` to `true`.

## Updating

To update the localization after localization has been added to one or more components please follow the
following steps:

### Extracting

First the new localizations need to be extracted from the components and this is done with the following
command `npm run locale:extract`

This will go through the entire project and get all the text that needs to be localized and puts them into
separate files for each localization.

After the localization text is extracted, the text for every locale can be updated in the files that are in
`src/data/i18n/locale/{locale}.xlf`.

The contents of the file will look similar to this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
<file target-language="es-419" source-language="en" original="lit-localize-inputs" datatype="plaintext">
<body>
<trans-unit id="s3ca5029ac693b7d5">
  <source>HomePage</source>
</trans-unit>
</body>
</file>
</xliff>
```

To add a localization manually, the following can be updated

```xml
<target>Página Principal</target>
```

So it would look like this

```xml
<trans-unit id="s3ca5029ac693b7d5">
  <source>HomePage</source>
  <target>Página Principal</target>
</trans-unit>
```

There are also tools available online to update these files.

### Building

After the extraction and updating of the localization texts, the updates need to be built before they show up
in the application. This is automatically run during the regular build process.

This will generate files that are used to get the correct text for the correct set locale.

These files are saved in `src/data/i18n/locale/generated` and should not be changed manually because any changes
will be overwritten whenever a new build is created.
The automatically generated files are ignored and not pushed to the repository.
