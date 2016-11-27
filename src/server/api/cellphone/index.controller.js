const Cellphone = require('./index.model');
const { getInitCellphones } = require('../../helpers/initialfats');

function getCellphone(req, res) {
  // Set the id that came from the GET data
  const id = req.query.id;
  if (id) {
    // Use the Cellphone model to find a specific Cellphone
    Cellphone.findById(id, (err, cellphone) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(cellphone);
    });
  } else {
    // Use the Cellphone model to find all Cellphones
    Cellphone.find((err, cellphones) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(cellphones);
      }
    });
  }
}

function postCellphone(req, res) {
  // Create a new instance of the Cellphone model
  const cellphone = new Cellphone(req.body);
  // Save the Cellphone and check for errors
  cellphone.save((err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json({ message: 'Cellphone added to the database!', data: cellphone });
    }
  });
}

function putCellphone(req, res) {
  // Set the id that came from the GET data
  const id = req.query.id;
  if (id) {
    // Use the Cellphone model to find a specific Cellphone
    Cellphone.findById(req.query.id, (err, data) => {
      if (err) {
        res.status(400).json(err);
      } else {
        const cellphone = data;
        if (cellphone) {
          // Update the existing Cellphone degree, cvlacUrl and deparment
          // TODO: Update the cellphone
          /*
          cellphone.degree = req.body.degree;
          cellphone.deparment = req.body.deparment;
          cellphone.cvlacUrl = req.body.cvlacUrl;
          */
          // Save the Cellphone and check for errors
          cellphone.save((error) => {
            if (error) {
              res.status(400).json(error);
            } else {
              res.status(200).json(Cellphone);
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

function deleteCellphone(req, res) {
  // Use the Cellphone model to find a specific Cellphone and remove
  Cellphone.findByIdAndRemove(req.query.id, (err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json({ message: 'Success removed!' });
    }
  });
}

function getCellphoneByParentType(req, res) {
  // Set the id that came from the GET data
  const parent = req.query.parent;
  Cellphone
    .find({
      type: new RegExp(`${parent}`, 'i'),
    })
    .exec((err, cellphone) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(cellphone);
    });
}
function init(req, res) {
  // Set the id that came from the GET data
  getInitCellphones((result) => {
    res.status(200).json({ message: 'Initial Cellphones added!', error: result });
  });
  const json = [];
  getInitCellphones()
    .then((phone) => {
      json.push(phone);
    })
    .then(() => {
      // res.status(200).json({ message: 'Initial Cellphones added!' });
    })
    .catch((error) => {
      res.status(200).json({ message: 'Can\'t save', error });
    });
}

module.exports = {
  getCellphone, postCellphone, putCellphone, deleteCellphone, getCellphoneByParentType, init,
};
