const pool = require('../../database');

module.exports = {
  getProducts: (callback) => {
    pool.query('SELECT * FROM products WHERE product_id=11', (error, data) => {
      if (error) {
        callback(error, null);
      } else {
        const information = data.rows[0];
        // callback(null, data.rows[0]);
        pool.query('SELECT * FROM features WHERE product_id=11', (error, data) => {
          if (error) {
            callback(error, null);
          } else {
            information.features = data.rows;
            callback(null, information);
          }
        })
      }
    })
  },

  getStyles: (callback) => {
    pool.query('SELECT * FROM styles WHERE product_id=1', (error, data) => {
      if (error) {
        callback(error, null);
      } else {
        const information = {};
        information.results = data.rows;
        // Add product info
        // Add photos for each of the results
        callback(null, information);
      }
    })
  },

  getRelated: (callback) => {
    pool.query('SELECT * FROM related WHERE product_id=1', (error, data) => {
      if (error) {
        callback(error, null);
      } else {
        const information = [];
        data.rows.forEach((result) => {
          // Need to change the sql table (typo)
          information.push(result.related_id);
        })
        callback(null, information);
      }
    })
  }
};