const db = require("../../connection/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const controller = {
  async userRegister(req, res) {
    try {
      const { user_name, user_email, password } = req.body;
      db.query(
        "SELECT * FROM user_register WHERE user_email = ?",
        [user_email],
        async (err, results) => {
          if (err) {
            res.status(401).json({ status: false, message: err });
          } else if (results.length > 0) {
            res.status(409).send("User already exists");
          } else {
            const salt = await bcrypt.genSaltSync(10);
            const hashed = await bcrypt.hash(password, salt);

            db.query(
              "INSERT INTO user_register (user_name, user_email, password) values(?,?,?)",
              [user_name, user_email, hashed],
              (err, data) => {
                if (err) {
                  res.status(401).json({ status: false, message: err });
                } else {
                  res.status(200).send({
                    status: true,
                    message: "Registration successful",
                    data,
                  });
                }
              }
            );
          }
        }
      );
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },

  login(req, res, next) {
    try {
      const { user_email, password } = req.body;
      db.query(`select * from user_register where user_email=?`,[user_email],async (err, result) => {
          if (err) {
            res.status(403).json({ status: false, message: err });
          } else {
            if (result[0].user_email) {
              const compare = await bcrypt.compare(
                password,
                result[0].password
              );

              if (compare) {
                const token = jwt.sign({ id: result[0].id }, "abcdefgh", {
                  expiresIn: "1h",
                });

                res
                  .status(200)
                  .json({ status: true, message: "Login successfull", token: token, data: result[0] });
              } else {
                res
                  .status(401)
                  .json({ status: false, message: "Incorrect Password" });
              }
            } else {
              res
                .status(404)
                .json({ status: false, message: "User doesn't exist" });
            }
          }
        }
      );
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },

  async getUsers(req, res) {
    try {
      db.query(`SELECT * FROM user_register`, (err, result) => {
        if (err) {
          res.status(401).json({ status: false, message: err });
        } else {
          res.status(200).json({ status: true, message: "Success", result });
        }
      });
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },
};

module.exports = controller;
