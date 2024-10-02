import type { PlopTypes } from "@turbo/gen";

// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

const modules = ["connection-test", "report"];

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator("component", {
    description: "Adds a new react component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the component?",
      },
      {
        type: "list",
        name: "module",
        message: "What module should this component be added to?",
        choices: modules.map((m) => ({
          name: plop.renderString(`{{sentenceCase name}} ({{name}})`, {
            name: m,
          }),
          value: m,
        })),
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/modules/{{module}}/components/{{pascalCase name}}/index.tsx",
        templateFile: "templates/component.hbs",
      },
    ],
  });
}
