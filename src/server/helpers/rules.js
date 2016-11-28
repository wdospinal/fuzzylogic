// Rules for descart phone based in questions
const Cellphone = require('../api/cellphone/index.model');

// All rules of questions
function ruleScreenImportace(element, listPhonesInitial) {
  let phones;
  if (element === 'size') {
    phones = listPhonesInitial.map((data) => {
      const phone = data;
      if (phone.scream > 5) {
        phone.cal += 3;
      }
      return phone;
    });
  } else if (element === 'resolution') {
    phones = listPhonesInitial.map((data) => {
      const phone = data;
      if (phone.scream > 6) {
        phone.cal += 3;
      }
      return phone;
    });
  }
  return phones;
}

function ruleScreenSize(element, listPhonesInitial) {
  let phones;
  if (element === 'xs') {
    
  } else if (element === 's') {
    
  } else if (element === 'm') {
    
  } else if (element === 'l') {
    
  } else if (element === 'xl') {
    
  } 
  return phones;
}

function ruleDesign(element, listPhonesInitial) {
  let phones;
  if (element === 'ejecutive') {
    
  } else if (element === 'fashion') {
    
  } else if (element === 'fresh') {
    
  } 
  return phones;
}

function ruleCameraDo(element, listPhonesInitial) {
  let phones;
  if (element === 'profesional') {
    
  } else if (element === 'pasion') {
    
  } else if (element === 'normal') {
    
  } 
  return phones;
}

function rulePerformanceType(element, listPhonesInitial) {
  let phones;
  if (element === 'ultra') {
    
  } else if (element === 'high') {
    
  } else if (element === 'good') {
    
  } 
  return phones;
}

function rulePerformanceDo(element, listPhonesInitial) {
  let phones;
  if (element === 'true') {
    
  } else if (element === 'false') {
    
  }
  return phones;
}

function ruleScreenResolution(element, listPhonesInitial) {
  let phones;
  if (element === 'good') {
    
  } else if (element === 'high') {
    
  } else if (element === 'ultra') {
    
  }
  return phones;
}

function applyRule(element, listPhones, rule) {
  return rule(element, listPhones);
}

function getRule(key, element, listPhones) {
  // console.log(element);
  console.log(listPhones);
  switch (key) {
    case 'screenImportace':
      applyRule(element, listPhones, ruleScreenImportace);
      break;
    case 'screenResolution':
      break;
    case 2:
      break;
    default:
      console.log(key);
      break;
  }
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
    init()
    .then((listPhones) => {
      let list = listPhones;
      let count = 0;
      const length = Object.keys(response).length;
      Object.keys(response).forEach((key) => {
        count += 1;
        if (Object.prototype.hasOwnProperty.call(response, key)) {
          const element = response[key];
          list = getRule(key, element, list);
        }
        if (count === length) {
          console.log('end');
          resolve(list);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
  });
}

module.exports = {
  rules,
};

