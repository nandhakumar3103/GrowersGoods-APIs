const db = require("../connection/db");
const ProductHelper = require("../controller/HelperMethods/ProductCategory");

const controller = {
  async farmerAddProducts(req, res) {
    try {
      const {
        category,
        farmerName,
        productName,
        productDetails,
        productQuantity,
        address,
        pincode,
        mobileNo,
        altertiveMobileNo,
        email,
      } = req.body;

      db.query(
        `insert into farmerAddProducts(
        category,
        farmerName,
        productName,
        productDetails,
        productQuantity,
        address,
        pincode,
        mobileNo,
        altertiveMobileNo,
        email
        ) values (?,?,?,?,?,?,?,?,?,?)`,
        [
          category,
          farmerName,
          productName,
          productDetails,
          productQuantity,
          address,
          pincode,
          mobileNo,
          altertiveMobileNo,
          email,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(401).json({ status: false, message: err });
          } else {
            res.status(200).json({ status: true, message: result });
          }
        }
      );
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },

  async farmerGetproducts(req, res) {
    try {
      db.query(`select * from farmerAddProducts`, (err, result) => {
        if (err) {
          res.status(401).json({ status: false, message: err });
        } else {
          res.status(200).json({ status: true, message: result });
        }
      });
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },

  async farmerAcceptsProducts(req, res) {
    try {
      const { id } = req.params;
      const { productQuantity } = req.body;

      console.log(productQuantity);

      db.query(
        `select * from farmeraddproducts where id=?`,
        [id],
        (err, result) => {
          if (err) {
            res.status(401).json({ status: false, message: err });
          } else {
            if (result?.length == 0) {
              res
                .status(404)
                .json({ status: false, message: "Products Doesn't exist..!" });
            } else {
              if(result[0]?.inventory_status == "InProgress" && productQuantity){
                const { category } = result[0];
                if (category == "vegetables") {
                  ProductHelper.ProductCategory("vegetables", result[0], res, id, productQuantity);
                } else if (category == "seeds") {
                  ProductHelper.ProductCategory("seeds", result[0], res, id, productQuantity);
                } else if (category == "fertilizer") {
                  ProductHelper.ProductCategory("fertilizer", result[0], res, id, productQuantity);
                } else {
                  res.status(401).json({
                    status: false,
                    message: "Category is not available...!",
                  });
                }
              }else if(result[0]?.inventory_status == "Accepted"){
                res
                .status(405)
                .json({ status: false, message: "Product already accepted" });
              }else{
                res
                .status(405)
                .json({ status: false, message: "Product already rejected" });
              }
              
            }
          }
        }
      );
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },

  async farmerRejectedProducts(req, res) {
    try {
      const { id } = req.params;

      db.query(
        `select * from farmeraddproducts where id=?`,
        [id],
        (err, result) => {
          if (err) {
            res.status(403).json({ status: false, message: err });
          } else {
            console.log(result);

            if ((result[0].inventory_status == "Accepted")) {
              res
                .status(405)
                .json({ status: false, message: "Product already accepted" });

            } else if ((result[0].inventory_status == "Rejected")) {
              res
                .status(405)
                .json({ status: false, message: "Product already rejected" });
            } else {
              db.query(
                `UPDATE farmeraddproducts SET inventory_status=? where id=?`,
                ["Rejected", id],
                (err, answer) => {
                  if (err) {
                    res.status(403).json({ status: false, message: err });
                  } else {
                    res.status(200).json({ status: true, message: answer });
                  }
                }
              );
            }
          }
        }
      );
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },
};

module.exports = controller;
