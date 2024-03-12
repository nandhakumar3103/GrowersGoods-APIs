const db = require("../../connection/db");

const categoryHelper = {
  async ProductCategory(Table_name, result, res, id, productQuantity) {
    const { productName } = result;

    db.query(
      `select * from ${Table_name} where product_name=?`,
      [productName],
      (err, value) => {
        if (err) {
          res.status(401).json({ status: false, message: err });
        } else {
          if (value == 0) {
            db.query(
              `insert into ${Table_name}(product_name, in_stock, category) values(?, ?, ?)`,
              [productName, productQuantity, Table_name],
              (error, data) => {
                if (err) {
                  res.status(401).json({ status: false, message: error });
                } else {
                  db.query(
                    `UPDATE farmeraddproducts SET inventory_status=? where id=?`,
                    ["Accepted", id],
                    (errors, result) => {
                      if (errors) {
                        res
                          .status(401)
                          .json({ status: false, message: errors });
                      } else {
                        res.status(200).json({ status: true, message: result });
                      }
                    }
                  );
                }
              }
            );
          } else {
            const { product_name, in_stock } = value[0];

            let update_in_stock =
              parseInt(in_stock) + parseInt(productQuantity);

            if (product_name === productName) {
              db.query(
                `UPDATE ${Table_name} SET in_stock=? WHERE product_name=?`,
                [update_in_stock, product_name],
                (error, answer) => {
                  if (err) {
                    res.status(401).json({ status: false, message: error });
                  } else {
                    db.query(
                      `UPDATE farmeraddproducts SET inventory_status=? where id=?`,
                      ["Accepted", id],
                      (errors, result) => {
                        if (errors) {
                          res
                            .status(401)
                            .json({ status: false, message: errors });
                        } else {
                          res
                            .status(200)
                            .json({ status: true, message: result });
                        }
                      }
                    );
                  }
                }
              );
            } else {
              res.status(400).json({
                status: false,
                message: "Product name is wrong...!",
              });
            }
          }
        }
      }
    );
  },
};

module.exports = categoryHelper;
