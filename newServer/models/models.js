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

  // getStyles: (callback) => {
  //   pool.query('SELECT * FROM styles WHERE product_id=1', async (error, data) => {
  //     if (error) {
  //       callback(error, null);
  //     } else {
  //       const information = {};
  //       information.results = data.rows;
  //       // Add product info
  //       // Add photos for each of the results
  //       await information.results.forEach(async (result) => {
  //         result.photos = await pool.query(`SELECT * FROM photos WHERE style_id=${result.style_id}`, (error, data) => {
  //           if(error) {
  //             console.log(error);
  //           } else {
  //             return data;
  //           }
  //         });
  //       })
  //       callback(null, information);
  //     }
  //   })
  // },
  getStyles: async (callback) => {
    const information = {};
    await pool.query('SELECT * FROM styles WHERE product_id=1')
      .then((response) => {
        information.results = response.rows;
      })
    await Promise.all(information.results.map(async (result) => {
      await pool.query(`SELECT * FROM photos WHERE style_id=${result.style_id}`)
        .then((response) => {
          result.photos = response.rows;
          result.skus = {};
        })
    }))
    await Promise.all(information.results.map(async (result) => {
      await pool.query(`SELECT * FROM skus WHERE style_id=${result.style_id}`)
        .then((response) => {
          // console.log(response.rows)
          response.rows.forEach((sku) => {
            const id = sku.sku_id;
            // skuData[id] = sku;
            result.skus[id] = sku;
          })
        })
    }))
    callback(null, information);
      // .then(async (data) => {
      //   console.log(data);
      //   await data.results.forEach(async (result) => {
      //     await pool.query(`SELECT * FROM photos WHERE style_id=${result.style_id}`)
      //       .then((response) => {
      //         result.photos = response.rows;
      //       })
      //   })
      //   callback(null, data);
      // })
      // .then((response) => {
      //   console.log(response);
      // })
  },

  // getPhotos: (callback) => {
  //   pool.query('SELECT * FROM photos WHERE style_id=1')
  // }

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