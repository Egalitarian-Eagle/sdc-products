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
      })
      .catch((error) => {
        callback(error, null);
      });
    await Promise.all(information.results.map(async (result) => {
      const { style_id } = result;
      const photoQuery = `SELECT thumbnail_url, url FROM photos WHERE style_id=${style_id}`;
      await pool.query(photoQuery)
        .then((response) => {
          result.photos = response.rows;
          result.skus = {};
        })
        .catch((error) => {
          callback(error, null);
        });
      if (result.sale_price === 'null') {
        result.sale_price = null;
      }
    }))
    await Promise.all(information.results.map(async (result) => {
      const { style_id } = result;
      const skuQuery = `SELECT sku_id, size, quantity FROM skus WHERE style_id=${style_id}`;
      await pool.query(skuQuery)
        .then((response) => {
          response.rows.forEach((sku) => {
            const { sku_id, size, quantity } = sku;
            result.skus[sku_id] = { size: size, quantity: quantity };
          })
        })
        .catch((error) => {
          callback(error, null);
        });
    }))
    callback(null, information);
  },

  getRelated: (params, callback) => {
    const { product_id } = params;
    const relatedQuery = `SELECT related_id FROM related WHERE product_id=${product_id}`;
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
  },

  getCart: (params, callback) => {
    const { user_id } = params;
    const cartQuery = `SELECT sku_id, count FROM cart WHERE user_id=${user_id}`;
    pool.query(cartQuery, (error, data) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, data.rows);
      }
    })
  },

  postCart: (params, body, callback) => {
    const { user_id } = params;
    const { sku_id, count } = body;
    const cartQuery =`INSERT INTO cart (user_id, sku_id, count, active) VALUES (${user_id}, ${sku_id}, ${count}, true)`;
    pool.query(cartQuery, (error, data) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, 'CREATED');
      }
    })
  }
};