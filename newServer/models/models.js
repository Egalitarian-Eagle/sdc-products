const pool = require('../../database');

module.exports = {
  getProducts: (params, callback) => {
    const { product_id } = params;
    const productQuery = `SELECT * FROM products WHERE product_id=${product_id}`;
    pool.query(productQuery, (error, data) => {
      if (error) {
        callback(error, null);
      } else {
        const information = data.rows[0];
        const featureQuery = `SELECT feature, value FROM features WHERE product_id=${product_id}`
        pool.query(featureQuery, (error, data) => {
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

  getStyles: async (params, callback) => {
    const { product_id } = params;
    const information = { product_id: product_id };
    const styleQuery = `SELECT style_id, name, original_price, sale_price, isDefault FROM styles WHERE product_id=${product_id}`;
    await pool.query(styleQuery)
      .then((response) => {
        information.results = response.rows;
      });
    await Promise.all(information.results.map(async (result) => {
      const { style_id } = result;
      const photoQuery = `SELECT * FROM photos WHERE style_id=${style_id}`;
      await pool.query(photoQuery)
        .then((response) => {
          result.photos = response.rows;
          result.skus = {};
        });
    }))
    await Promise.all(information.results.map(async (result) => {
      const { style_id } = result;
      const skuQuery = `SELECT * FROM skus WHERE style_id=${style_id}`;
      await pool.query(skuQuery)
        .then((response) => {
          response.rows.forEach((sku) => {
            const id = sku.sku_id;
            result.skus[id] = sku;
          })
        });
    }))
    callback(null, information);
  },

  getRelated: (params, callback) => {
    const { product_id } = params;
    const relatedQuery = `SELECT * FROM related WHERE product_id=${product_id}`
    pool.query(relatedQuery, (error, data) => {
      if (error) {
        callback(error, null);
      } else {
        const information = [];
        data.rows.forEach((result) => {
          const { related_id } = result;
          information.push(related_id);
        })
        callback(null, information);
      }
    })
  }
};