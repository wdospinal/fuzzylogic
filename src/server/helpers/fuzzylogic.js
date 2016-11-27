const { Logic } = require('./lib/logic');
const { Trapezoid } = require('./lib/curve/trapezoid');
const { Triangle } = require('./lib/curve/triangle');

function fuzz(timeValue, priceValue) {
  const logic = new Logic();
  const fuzzTime = logic
    .init('relax', new Trapezoid(0, 0, 3, 6))
    .and('normal', new Trapezoid(3, 6, 9, 12))
    .and('adict', new Trapezoid(9, 12, 15, 18))
    .defuzzify(timeValue);
  const time = fuzzTime.toString();

  const logic2 = new Logic();
  const fuzzPrice = logic2
    .init('cheap', new Triangle(new Trapezoid(0, 0, 117900, 849900)))
    .and('medium', new Trapezoid(117900, 849900, 1799900, 4099000))
    .and('expensive', new Trapezoid(1799900, 2299900, 3159000, 4099000))
    .defuzzify(priceValue);
  const price = fuzzPrice.toString();

  // Rules

  if (time === 'relax') {
    return 'low';
  } else if (time === 'normal' && price === 'cheap') {
    return 'medium';
  } else if (time === 'normal' && price === 'medium') {
    return 'medium';
  } else if (time === 'normal' && price === 'expensive') {
    return 'high';
  } else if (time === 'adict' && price === 'cheap') {
    return 'medium';
  } else if (time === 'adict' && price === 'medium') {
    return 'high';
  } else if (time === 'adict' && price === 'expensive') {
    return 'high';
  }
  return 'high';
}


module.exports = {
  fuzz,
};
