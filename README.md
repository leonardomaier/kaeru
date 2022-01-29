# leonardomaier/kaeru [Work in progress]

The [Kaeru](https://www.npmjs.com/package/kaeru) Command Line Interface (CLI)

See the project in [GitHub](https://github.com/leonardomaier/kaeru)

## Table of Contents

- [Installation](#installation)
- [Contributing](#contributing)

## Installation

Install the Kaeru CLI to be used in your project with

```bash
npm install kaeru
```

And then we should be able to run the CLI with

```bash
kaeru --help
```

### Usage

```bash
Kaeru CLI [Node: > 12.22.1]

kaeru <command>

Commands:
  kaeru new-config configname                                                     Creates configuration file
  kaeru new-template templatename                                                 Creates template file
  kaeru run-command <command> --config <config> --vars "key=value,test=content"   Runs command created in the specified configuration file

Options:
  --version  Show version number                                                  [boolean]
  --help     Show help                                                            [boolean]

Please specify a command
```

### Use cases

Sometimes we need to create a set of files everytime we are creating a new page/feature and that's when Kaeru comes in hand.

For example, we are working in an Angular project and we always need to create these three files when developing a new page:

- page.component.html
- page.component.ts
- page.component.scss
- page.component.spec.ts

We could have used Angular CLI for creating those files but there are cases that its needed to define more details about each file, like its content and some conventions of the project.

First of all, we can start creating a new configuration file running:

```bash
kaeru new config.yaml
```

This command will create a YAML file with all the options we can use for creating a customizable command.

| Syntax      | Description |
| ----------- | ----------- |
| projectPath | Path to the project you're working on       |
| globalVariables   | Define variables that will be used later on |
| commands    | Define the commands available for Kaeru     |

It will generate something like this:

```yaml
projectPath: ""
globalVariables:
  name: ""
commands:
  myFirstCommand:
    path: ""
    folder: ""
    files:
      - name: ""
        extension: ".ts"
      - name: ""
        extension: ".scss"
      - name: ""
        extension: ".html"
```

We can customize our file to be something like this:

```yaml
projectPath: "./"
globalVariables:
  name: "Kaeru"
commands:
  myFirstCommand:
    path: "./"
    folder: "test"
    files:
      - name: "${name}Component"
        extension: ".ts"
      - name: "${name}Component"
        extension: ".scss"
      - name: "${name}Component"
        extension: ".html"
```

Then run:

```bash
kaeru run-command myFirstCommand --config .\config.yaml
```

### Templates

It's possible to reference template files on the YAML configuration, then we have the possibility to define variables to be replaced.

For example:

Suppose that we have a template like this:

```
export class ${componentName} {
  private ${firstVariableName};
}
```

It's possible to define variables to replaced to that specific template:

```yaml
projectPath: "./"
commands:
  myFirstCommand:
    path: "./"
    folder: "components/new-component"
    files:
      - name: "${name}-${anotherName}"
        template: 
          path: "leonardo-template.kaeru"
          variables:
            componentName: "NewComponent"
            firstVariableName: "translateService"
        extension: "ts"
      - name: "${name}"
        extension: "scss"
      - name: "${name}"
        extension: "html"
```

It will be evaluated to:

```js
export class NewComponent {
  private translateService;
}
```

### Variables

We are able to define variables in multiple ways:

- Using globalVariables in the YAML file

```yaml
projectPath: "./"
globalVariables: 
  key: "value"
  test: "content"
commands:
  myFirstCommand:
    path: "./"
    folder: "components/new-component"
    files:
      - name: "${name}"
        extension: "ts"
      - name: "${name}"
        extension: "scss"
      - name: "${name}"
        extension: "html"

```

- Using template variables

```yaml
projectPath: "./"
commands:
  myFirstCommand:
    path: "./"
    folder: "components/new-component"
    files:
      - name: "${name}-${anotherName}" // This will be replaced by variables from option --vars or globalVariables
        template: 
          path: "leonardo-template.kaeru"
          variables:
            componentName: "NewComponent" // This will only replace variables in the template content
            firstVariableName: "translateService" // This will only replace variables in the template content
        extension: "ts"

```

- Using --vars option

```bash
kaeru run-command myCommand --config .\config.yaml --vars "name=testName,anotherName=testAnotherName"
```

OBS: The order of precedence is --vars and then globalVariables

## Next features

- [x] CLI command for creating templates
- [x] Ability to define the file content in each template

Feel free to suggest something in a issue.

## Tasks to be done

- [ ] Add unit tests
- [ ] Create GitHub Action for releasing new versions
- [ ] Find a way of decreasing package size
- [ ] Use a code quality tool to find critical issues. 


## Contributing

All contributions are accepted as a PR.

- You can file issues by submitting a PR (with test) as a test case.
- Implement new feature by submitting a PR

Please read the [contributing guidelines](CONTRIBUTING.md).

