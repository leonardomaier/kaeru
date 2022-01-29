const convertVariablesFromCliCommand = (variables) => {
  const result = {};

  const splittedVariables = variables.split(',');

  if (!splittedVariables || splittedVariables.length <= 0) {
    return {};
  }

  splittedVariables.forEach((variable) => {
    const [key, value] = variable.split('=');
    result[key] = value;
  });

  return result;
};

module.exports = {
  convertVariablesFromCliCommand,
};
