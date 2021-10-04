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
  },

  getCart: (req, res) => {
    models.getCart(req.params, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },

  postCart: (req, res) => {
    models.postCart(req.params, req.body, (err, data) => {
      if (err) {
        res.status(501).send(err);
      } else {
        res.status(201).send(data);
      }
    })
  },
};
