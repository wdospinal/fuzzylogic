exports.Constant = class Constant {
  constructor(constantValue) {
    this.cValue = constantValue;
  }
  fuzzify(val) {
    return this.cValue;
  }
};

