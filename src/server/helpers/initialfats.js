// web scrapping alkomprar
const fs = require('fs');
const Xray = require('x-ray');

// Load initial questions
const path = require('path');
const Question = require('../api/question/index.model');
const Cellphone = require('../api/cellphone/index.model');

const deleteTags = (word) => {
  let result;
  if (word !== undefined) {
    result = word.replace(/(<([^>]+)>?)/ig, '');
  } else {
    result = '';
  }
  return result;
};
const cleanStr = word => word.replace(/':'/ig, '').trim();

function getInitQuestions(done) {
  let obj;
  fs.readFile(path.resolve(__dirname, './initial/questions.json'), 'utf8', (err, data) => {
    const res = [];
    if (err) throw err;
    obj = JSON.parse(data);
    obj.forEach((element) => {
      const question = new Question(element);
      // Save the Question and check for errors
      question.save((error) => {
        res.push(error);
        if (res.length === obj.length) {
          done(res);
        }
      });
    });
  });
}

function getInitCellphones() {
  return new Promise((resolve, reject) => {
    const x = Xray();
    fs.readFile(path.resolve(__dirname, './initial/page.html'), 'utf8', (error, data) => {
      x(data, '.amlabel-div', {
        href: ['a@href'],
        src: 'img@src',
      })((err, result) => {
        if (err) reject(err);
        const listHref = result.href;
        listHref.forEach((url, index) => {
          if (index === listHref.length - 1) {
            resolve();
          }
          x(url, {
            name: '.product-name h1',
            price: '.price',
            html: 'div.content@html',
          })((faild, resulta) => {
            if (faild) reject(faild);
            const prices = resulta.price.match(/(([0-9]+[.]?)+)/g);
            const price = prices[prices.length - 1];
            const html = resulta.html;
            const array = html.match(/<strong>(.*?)<\/strong>/g);
            const split = html.match(/<\/strong>(.*?)<br>/g);
            const name = resulta.name.replace('Celular', '').trim();
            const cellphone = {
              price,
              url,
              name,
              src: result.src,
              scream: '',
              camera: '',
              so: '',
              red: '',
            };
            if (array !== null) {
              for (let i = 0; i < array.length + 1; i += 1) {
                if (i === array.length) {
                  console.log(cellphone);
                  // Create a new instance of the Cellphone model
                  const smarth = new Cellphone(cellphone);
                  // Save the Cellphone and check for errors
                  smarth.save((errores) => {
                    if (errores) reject(errores);
                  });
                }
                if (array[i] !== undefined) {
                  const type = deleteTags(array[i]);
                  const value = cleanStr(deleteTags(split[i]));

                  switch (type) {
                    case String(type.match(/^Pantalla.*/ig)):
                      cellphone.scream = value.match(/[0-9]*/g)[0];
                      break;
                    case String(type.match(/.*mara.*/ig)):
                      cellphone.camera = value;
                      break;
                    case String(type.match(/^Procesador.*/ig)):
                      cellphone.processor = value;
                      break;
                    case String(type.match(/^Sistema.*/ig)):
                      cellphone.so = value;
                      break;
                    case String(type.match(/^Memoria Interna.*/ig)):
                      cellphone.memoryInter = value;
                      break;
                    case String(type.match(/^Memoria Disponible.*/ig)):
                      cellphone.memoryEnable = value;
                      break;
                    case String(type.match(/^Capacidad.*/ig)):
                      cellphone.memoryEnable = value;
                      break;
                    case String(type.match(/.*Ram.*/ig)):
                      cellphone.ram = value;
                      break;
                    case String(type.match(/^RED.*/ig)):
                      cellphone.red = value;
                      break;
                    case String(type.match(/^Memoria.*/ig)):
                      cellphone.memoria = value;
                      break;
                    default:
                      break;
                  }
                }
              }
            }
          });
        });
      })
        .paginate('.next.i-next@href')
        .limit(10);
    });
  });
}

module.exports = {
  getInitQuestions,
  getInitCellphones,
};
