const invalidKeys = {
  Shift: true,
  null: true,
  Backspace: true,
};

export default (key) => !invalidKeys[key];
