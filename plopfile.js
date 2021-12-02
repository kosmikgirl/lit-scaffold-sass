module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'add empty lit component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your component (example: `lit-element`)?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/component/{{dashCase name}}.ts',
        templateFile: 'plop-templates/component.ts',
        skipIfExists: true,
      },
    ],
  });
};
