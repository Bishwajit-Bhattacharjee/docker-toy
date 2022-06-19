const userFields = [
  'firstName',
  'lastName',
  'email',
  'mobileNo'
];

const getClearState = () => {
  const states = {};
  userFields.forEach(field => states[field] = "");
  return states;
}

export {
    userFields,
    getClearState
};