# leonardomaier/kaeru [Work in progress]

The [Kaeru](https://www.npmjs.com/package/kaeru) Command Line Interface (CLI)

## Table of Contents

- [Installation](#installation)
- [Contributing](#contributing)

## Installation

Install the Kaeru CLI to be used in your project with

```bash
npm install kaeru
```

And then you should be able to run the CLI with

```bash
kaeru --help
```

### Usage

```bash
Kaeru CLI [Node: > 12.22.1]

kaeru <command>

Commands:
  kaeru new newconfig.yaml                        Creates configuration file
  kaeru run-command <command> --config <config>   Runs command created in the specified configuration file

Options:
  --version  Show version number                                                  [boolean]
  --help     Show help                                                            [boolean]

Please specify a command
```

### Use cases

Sometimes we need to create a set of files everytime we are creating a new page/feature and that's when Kaeru comes in hand.

For example, you're an Angular developer and you always create these three files for a new page:

- page.component.html
- page.component.ts
- page.component.scss
- page.component.spec.ts

I'm sure you can create using Angular CLI, but there are cases that you need to define more details about each file, like its content and some conventions of your project.

You can start creating a new configuration file running:

```bash
kaeru new config.yaml
```

This command will create a YAML file with all the options you can use for creating a customizable command.

| Syntax      | Description |
| ----------- | ----------- |
| projectPath | Path to the project you're working on       |
| globalVariables   | Define variables that will be used later on |
| commands    | Define the commands available for Kaeru     |

You'll see something similar to this:

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

You can customize your file to be something like this:

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

## Next features

- CLI command for creating templates
- Ability to define the file content in each template


## Contributing

All contributions are accepted as a PR.

- You can file issues by submitting a PR (with test) as a test case.
- Implement new feature by submitting a PR

Please read the [contributing guidelines](CONTRIBUTING.md).

