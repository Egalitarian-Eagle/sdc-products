const models = require('../models/models.js');

module.exports = {
  getProducts: (req, res) => {
    models.getProducts(req.params, (err, data) => {
      if(err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },

  getStyles: (req, res) => {
    models.getStyles(req.params, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },

  getRelated: (req, res) => {
    models.getRelated(req.params, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  }
};
