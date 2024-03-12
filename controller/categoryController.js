const db = require("../connection/db");

const controller = {
  async addCategory(req, res) {
    try {
      const { cat_name, cat_status, cat_image } = req.body;

      await db.query(
        `SELECT * FROM category WHERE cat_name=?`,
        [cat_name],
        (err, result) => {
          if (err) {
            res.status(401).json({ status: false, message: err });
          } else {
            if (result[0]?.cat_name) {
              res
                .status(403)
                .json({ status: false, message: "Category already exist...!" });
            } else {
              try {
                db.query(
                  `insert into category(cat_name, cat_status, cat_image) values(?, ?, ?)`,
                  [cat_name, cat_status, cat_image],
                  (err, result) => {
                    if (err) {
                      res.status(401).json({ status: false, message: err });
                    } else {
                      res.status(200).json({ status: true, message: result });
                    }
                  }
                );
              } catch (error) {
                res.status(500).json({ status: false, message: error });
              }
            }
          }
        }
      );
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },

  async getCategory(req, res) {
    try {
      await db.query(`select * from category`, (err, result) => {
        if (err) {
          res.status(403).json({ status: false, message: err });
        } else {
          res.status(200).json({ status: true, message: result });
        }
      });
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },

  async getAllVegetables(req, res) {
    try {
      await db.query(`select * from vegetables`, (err, result) => {
        if (err) {
          res.status(403).json({ status: false, message: err });
        } else {
          if (result.length == 0) {
            res
              .status(404)
              .json({ status: false, message: "Products not found" });
          } else {
            res.status(200).json({ status: true, message: result });
          }
        }
      });
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },

  async updateVeggies(req, res) {
    try {
      const { id } = req.params;
      const {
        product_name,
        in_stock,
        image,
        our_price,
        market_price,
        ratings,
        slogan,
        slogan1,
      } = req.body;

      db.query(
        `UPDATE vegetables SET product_name=?,in_stock=?,image=?,our_price=?,market_price=?,ratings=?,slogan=?, slogan1=? WHERE id=?`,
        [
          product_name,
          in_stock,
          image,
          our_price,
          market_price,
          ratings,
          slogan,
          slogan1,
          id,
        ],
        (error, result) => {
          if (error) {
            res.status(500).json({ status: false, error });
          } else {
            console.log("result", result);
            if (result.affectedRows > 0) {
              res
                .status(200)
                .json({ status: true, message: "Updated success", result });
            } else {
              res
                .status(404)
                .json({ status: false, message: "Product not found." });
            }
          }
        }
      );
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },
  async updateSeeds(req, res) {
    try {
      const { id } = req.params;
      const {
        product_name,
        in_stock,
        image,
        our_price,
        market_price,
        ratings,
        slogan,
        slogan1,
      } = req.body;

      db.query(
        `UPDATE seeds SET product_name=?, in_stock=?, image=?, our_price=?, market_price=?, ratings=?, slogan=? ,slogan1=? WHERE id=?`,
        [
          product_name,
          in_stock,
          image,
          our_price,
          market_price,
          ratings,
          slogan,
          slogan1,
          id,
        ],
        (error, result) => {
          if (error) {
            res.status(500).json({ status: false, error });
          } else {
            if (result.affectedRows > 0) {
              res
                .status(200)
                .json({ status: true, message: "Updated success", result });
            } else {
              res
                .status(404)
                .json({ status: false, message: "Product not found." });
            }
          }
        }
      );
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },
  async updateFertilizer(req, res) {
    try {
      const { id } = req.params;
      const {
        product_name,
        in_stock,
        image,
        our_price,
        market_price,
        ratings,
        slogan,
        slogan1,
      } = req.body;

      db.query(
        `UPDATE fertilizer SET product_name=?, in_stock=?, image=?, our_price=?, market_price=?, ratings=?, slogan=? ,slogan1=? WHERE id=?`,
        [
          product_name,
          in_stock,
          image,
          our_price,
          market_price,
          ratings,
          slogan,
          slogan1,
          id,
        ],
        (error, result) => {
          if (error) {
            res.status(500).json({ status: false, error });
          } else {
            if (result.affectedRows > 0) {
              res
                .status(200)
                .json({ status: true, message: "Updated success", result });
            } else {
              res
                .status(404)
                .json({ status: false, message: "Product not found." });
            }
          }
        }
      );
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },
  async getParticularVegetable(req, res) {
    try {
      const { id } = req.params;

      await db.query(
        `select * from vegetables where id=?`,
        [id],
        (err, result) => {
          if (err) {
            res.status(403).json({ status: false, message: err });
          } else {
            if (result.length == 0) {
              res
                .status(404)
                .json({ status: false, message: "Product not found" });
            } else {
              res.status(200).json({ status: true, message: result });
            }
          }
        }
      );
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },

  async getAllSeeds(req, res) {
    try {
      await db.query(`select * from seeds`, (err, result) => {
        if (err) {
          res.status(403).json({ status: false, message: err });
        } else {
          if (result.length == 0) {
            res
              .status(404)
              .json({ status: false, message: "Products not found" });
          } else {
            res.status(200).json({ status: true, message: result });
          }
        }
      });
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },

  async getParticularSeed(req, res) {
    try {
      const { id } = req.params;

      await db.query(`select * from seeds where id=?`, [id], (err, result) => {
        if (err) {
          res.status(403).json({ status: false, message: err });
        } else {
          if (result.length == 0) {
            res
              .status(404)
              .json({ status: false, message: "Product not found" });
          } else {
            res.status(200).json({ status: true, message: result });
          }
        }
      });
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },

  async getAllFertilizers(req, res) {
    try {
      await db.query(`select * from fertilizer`, (err, result) => {
        if (err) {
          res.status(403).json({ status: false, message: err });
        } else {
          if (result.length == 0) {
            res
              .status(404)
              .json({ status: false, message: "Product not found" });
          } else {
            res.status(200).json({ status: true, message: result });
          }
        }
      });
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  },

  async getParticularFertilizer(req, res) {
    try {
      const { id } = req.params;

      await db.query(
        `select * from fertilizer where id=?`,
        [id],
        (err, result) => {
          if (err) {
            res.status(403).json({ status: false, message: err });
          } else {
            if (result.length == 0) {
              res
                .status(404)
                .json({ status: false, message: "Product not found" });
            } else {
              res.status(200).json({ status: true, message: result });
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
