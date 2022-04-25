module.exports = function (plop) {
  plop.setGenerator('page', {
    description: 'add empty lit page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your page (example: `home-page`)?',
      },
      {
        type: 'confirm',
        name: 'isAddingLifeCycle',
        message: 'Do you want to add empty lifecycle methods?',
      },
      {
        type: 'confirm',
        default: false,
        name: 'useSassStyles',
        message: 'Do you want to use a sass file?',
      },
    ],
    actions: function (data) {
      const cssStyleImport = {
        type: 'add',
        path: 'src/page/{{dashCase name}}/styles.ts',
        templateFile: 'plop-templates/styles.ts',
        skipIfExists: true,
      };
      const sassStyleImport = {
        type: 'add',
        path: 'src/page/{{dashCase name}}/{{dashCase name}}.scss',
        templateFile: 'plop-templates/styles.scss',
        skipIfExists: true,
      };
      return [
        {
          type: 'add',
          path: 'src/page/{{dashCase name}}/{{dashCase name}}.ts',
          templateFile: 'plop-templates/page.ts',
          skipIfExists: true,
        },
        data.useSassStyles ? {...sassStyleImport} : {...cssStyleImport},
      ];
    },
  });

  plop.setGenerator('component', {
    description: 'add empty lit component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your component (example: `lit-element`)?',
      },
      {
        type: 'confirm',
        name: 'isAddingLifeCycle',
        message: 'Do you want to add empty lifecycle methods?',
      },
      {
        type: 'confirm',
        default: false,
        name: 'useSassStyles',
        message: 'Do you want to use a sass file?',
      },
    ],
    actions: function (data) {
      const cssStyleImport = {
        type: 'add',
        path: 'src/component/{{dashCase name}}/styles.ts',
        templateFile: 'plop-templates/styles.ts',
        skipIfExists: true,
      };
      const sassStyleImport = {
        type: 'add',
        path: 'src/component/{{dashCase name}}/{{dashCase name}}.scss',
        templateFile: 'plop-templates/styles.scss',
        skipIfExists: true,
      };
      return [
        {
          type: 'add',
          path: 'src/component/{{dashCase name}}/{{dashCase name}}.ts',
          templateFile: 'plop-templates/component.ts',
          skipIfExists: true,
        },
        data.useSassStyles ? {...sassStyleImport} : {...cssStyleImport},
      ];
    },
  });

  plop.setGenerator('slice', {
    description: 'add empty store slice',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your slice (example: `database`)?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/store/module/{{dashCase name}}.ts',
        templateFile: 'plop-templates/slice.ts',
        skipIfExists: true,
      },
    ],
  });
};
