module.exports = (fields) => {
  const { _id, __v, ...remainingFields } = fields;

  return { ...remainingFields, id: _id };
};
