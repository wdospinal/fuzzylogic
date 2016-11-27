const { fuzz } = require('../../helpers/fuzzylogic');
const { rules } = require('../../helpers/rules');

function postResponse(req, res) {
    // Create a new instance of the Response model
  const response = req.body.response;
  const time = req.body.time;
  const price = req.body.price;
  let cellphoneOptions = [];
  response.forEach((element) => {
    console.log(element);
    cellphoneOptions
  });
  res.status(200).json({ message: 'Good send list' });
  console.log(fuzz(time, price));
}

module.exports = {
  postResponse,
};

