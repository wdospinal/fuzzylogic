const Question = require('./index.model');

function getQuestion(req, res) {
  // Set the id that came from the GET data
  const id = req.query.id;
  if (id) {
    // Use the Question model to find a specific Question
    Question.findById(id, (err, question) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(question);
    });
  } else {
    // Use the Question model to find all Questions
    Question.find((err, Questions) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(Questions);
      }
    });
  }
}

function postQuestion(req, res) {
  // Create a new instance of the Question model
  const question = new Question(req.body);
  // Save the Question and check for errors
  question.save((err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json({ message: 'Question added to the database!', data: question });
    }
  });
}

function putQuestion(req, res) {
  // Set the id that came from the GET data
  const id = req.query.id;
  if (id) {
    // Use the Question model to find a specific Question
    Question.findById(req.query.id, (err, data) => {
      if (err) {
        res.status(400).json(err);
      } else {
        const question = data;
        if (question) {
          // Update the existing Question degree, cvlacUrl and deparment
          // TODO: Update the question
          /*
          question.degree = req.body.degree;
          question.deparment = req.body.deparment;
          question.cvlacUrl = req.body.cvlacUrl;
          */
          // Save the Question and check for errors
          question.save((error) => {
            if (error) {
              res.status(400).json(error);
            } else {
              res.status(200).json(Question);
            }
          });
        } else {
          res.status(400).json('Not found!');
        }
      }
    });
  } else {
    res.status(400).json('ad request!');
  }
}

function deleteQuestion(req, res) {
  // Use the Question model to find a specific Question and remove
  Question.findByIdAndRemove(req.query.id, (err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json({ message: 'Success removed!' });
    }
  });
}

module.exports = {
  getQuestion, postQuestion, putQuestion, deleteQuestion,
};
