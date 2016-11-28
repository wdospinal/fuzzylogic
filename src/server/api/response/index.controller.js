const { fuzz } = require('../../helpers/fuzzylogic');
const { rules } = require('../../helpers/rules');

function postResponse(req, res) {
    // Create a new instance of the Response model
  const response = req.body.response;
  const time = req.body.time;
  const price = req.body.price;
  console.log(response);
  console.log(time);
  console.log(price);

  rules(response)
    .then(listPhones => fuzz(time, price, listPhones))
    .then((listPhones) => {
      res.status(200).json({ message: 'Your cellphone ideal', listPhones });
    })
    .catch((error) => {
      res.status(400).json({ message: 'Bad request!', error });
    });
}

module.exports = {
  postResponse,
};

