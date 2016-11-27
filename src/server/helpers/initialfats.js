// web scrapping alkomprar
const fs = require('fs');
// Load initial questions
const path = require('path');
const Question = require('../api/question/index.model');

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

// Initial Cellphones

module.exports = {
  getInitQuestions,
};
