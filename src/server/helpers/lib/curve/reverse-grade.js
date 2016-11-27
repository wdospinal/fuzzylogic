const { Shape } = require('./shape');

exports.ReverseGrade = class ReverseGrade extends Shape {
  fuzzify(val) {
    let result = 0;
    const x = val;

    if (x <= this.x0) {
      result = 1;
    } else if (x >= this.x1) {
      result = 0;
    } else {
      result = (-x / (this.x1 - this.x0)) + (this.x1 / (this.x1 - this.x0));
    }
    return result;
  }
};
