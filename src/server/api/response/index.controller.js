function postResponse(req, res) {
  // Create a new instance of the Response model
  const response = req.body;
  response.forEach((element) => {
    console.log(element);
  });
  res.status(200).json({ message: 'Good send list' });
}

module.exports = {
   postResponse,
};

