const isJson = (jsonData) => {
  let json = jsonData;

  json = typeof jsonData !== 'string'
    ? JSON.stringify(jsonData)
    : jsonData;

  try {
    json = JSON.parse(jsonData);
  } catch (e) {
    return false;
  }

  if (typeof json === 'object' && jsonData !== null) {
    return true;
  }

  return false;
};

module.exports = {
  isJson,
};
