// web scrapping alkomprar
const fs = require('fs');
const got = require('got');
const Xray = require('x-ray');
const cheerio = require('cheerio');

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

function request() {
  return new Promise((resolve, reject) => {
    const url = 'http://www.alkomprar.com/telefonos-celulares/smartphones-1';
    const x = Xray();
    x(url, {
      href: ['div@data-url'],
    })((err, result) => {
      if (result.href !== undefined) {
        result.href.forEach((url) => {
          if (url !== undefined) {
            got(url, { encoding: 'utf-8' })
              .then((response) => {
                const $ = cheerio.load(response.body);
                const html = $('.content').html();
                const price = $('span[itemprop="price"]').text();
                const inputs = $('img[src]');
                const src = inputs.attr('src');
                const name = $('.product-name h1').text();
                const array = html.match(/<strong>(.*?)<\/strong>/g);
                const split = html.match(/<\/strong>(.*?)<br>/g);
                const cellphone = {
                  price,
                  src,
                  url,
                  name,
                  scream: '',
                  camera: '',
                  preocessor: '',
                  so: '',
                  red: '',
                };
                if (array !== null) {
                  for (let i = 0; i < array.length + 1; i += 1) {
                    if (i === array.length) {
                      resolve(cellphone);
                    }
                    if (array[i] !== undefined) {
                      const type = deleteTags(array[i]);
                      const value = cleanStr(deleteTags(split[i]));

                      switch (type) {
                        case String(type.match(/^Pantalla.*/ig)):
                          cellphone.scream = value;
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
              })
              .catch((error) => {
                reject(error);
              });
          }
        });
      }
    })
    .paginate('.next.i-next@href')
    .limit(10);
  });
}

function getInitCellphones() {
  return new Promise((resolve, reject) => {
    request()
      .then((smarthphone) => {
        console.log(smarthphone);
        // Create a new instance of the Cellphone model
        const cellphone = new Cellphone(smarthphone);
        // Save the Cellphone and check for errors
        cellphone.save((err) => {
          if (err) reject(err);
          resolve(cellphone);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}


module.exports = {
  getInitQuestions,
  getInitCellphones,
};
