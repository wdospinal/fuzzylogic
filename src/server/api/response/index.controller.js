const { fuzz } = require('../../helpers/fuzzylogic');
const { rules } = require('../../helpers/rules');

function postResponse(req, res) {
    // Create a new instance of the Response model
  const response = req.body.response;
  const time = req.body.time;
  const price = req.body.price;

  // TODO: A cada elemento preguntar su valor y en una lista ir guardando este resultado

  rules(response)
  .then((listPhones) => {
    console.log(fuzz(time, price));
    res.status(200).json({ message: 'Good send list', listPhones });
  });
}

module.exports = {
  postResponse,
};

