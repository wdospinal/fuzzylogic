// Rules for descart phone based in questions
const Cellphone = require('../api/cellphone/index.model');

function applyRule(element, listPhones) {
  console.log(element);
  console.log(listPhones);
}

function init() {
  return new Promise((resolve, reject) => {
    let listPhones = [];
    Cellphone.find((err, cellphones) => {
      if (err) {
        reject(err);
      } else {
        listPhones = cellphones;
        resolve(listPhones);
      }
    });
  });
}

function rules(response) {
  return new Promise((resolve, reject) => {
    let count = 0;
    init()
    .then((listPhones) => {
      response.forEach((element) => {
        count += 1;
        console.log(element);
        applyRule(element, listPhones);
        if (count === response.length) {
          resolve(listPhones);
        }
      });
    });
  });
}


module.exports = {
  rules,
};

