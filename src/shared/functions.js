const convertVariablesFromCliCommand = (variables) => {
  const result = {};

  if (!variables) {
    return null;
  }

  const splittedVariables = variables.split(',');

  if (!splittedVariables || splittedVariables.length <= 0) {
    return null;
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
