const filterObj = (obj, allowedFields) => {
  const filteredFields = {};
  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) {
      filteredFields[key] = obj[key];
    }
  });

  return filteredFields;
};

module.exports = filterObj;
