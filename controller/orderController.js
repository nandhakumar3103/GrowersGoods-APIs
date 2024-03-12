const db = require("../connection/db");


const controller = {
    async orderDetails(req, res) {
      try {
        const {
            first_name,
          last_name,
          mobile_number,
          alternative_number,
          product_name,
          kg,
          address,
          city,
          email,
          pincode,
        } = req.body;
  
        db.query(
          `insert into cart(
            first_name,
          last_name,
          mobile_number,
          alternative_number,
          product_name,
          kg,
          address,
          city,
          email,
          pincode
          ) values (?,?,?,?,?,?,?,?,?,?)`,
          [
            first_name,
            last_name,
            mobile_number,
            alternative_number,
            product_name,
            kg,
            address,
            city,
            email,
            pincode,
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
  
    async getorderDetails(req, res) {
      try {
        db.query(`select * from cart`, (err, result) => {
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
}
module.exports=controller;
