const models = require('../models/models.js');

module.exports = {
  getProducts: (req, res) => {
    models.getProducts((err, data) => {
      if(err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },

  getStyles: (req, res) => {
    models.getStyles((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },

  getRelated: (req, res) => {
    models.getRelated((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(500).send(data);
      }
    })
  }
};
