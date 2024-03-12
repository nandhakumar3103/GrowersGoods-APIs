const connection = require('../connection/db.js')

const Razorpay = require('razorpay')
require('dotenv').config()

const razorpayInstance = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
})

function create_order(req, res) {
  const amount = parseInt(req.body.amount, 10);
  const currency = "INR";
  const payment_capture = 1;
  const receipt = 'Testing'

  razorpayInstance.orders.create({ amount, currency, payment_capture, receipt }, (err, data) => {
    if (data) {
      var order_id = data.id
      connection.query(`INSERT INTO orders (order_id, amount, currency, receipt, payment_capture) VALUES (?, ?, ?, ?,?)`,
        [data.id, amount, currency, receipt, Date.now()], (err, data) => {
          if (err) throw err;
          res.send({ status: true, message: 'Payment details inserted success', data });
        });
    } else {
      res.json({ err });
    }
  });
}

function fetch_order(req, res) {
  // razorpayInstance.orders.fetch("order_NYkG7UCSDJ64Qh", (err, data) => {
  //   // if (data) res.json({ data })
  //   // else res.json({ err })
  //   if (data) {
  //     connection.query(`SELECT * FROM orders`, [data], (err, result) => {
  //       if (err) throw err;

  //       res.send({ status: true, message: 'Success', result });
  //     });
  //   } else {
  //     res.send({ status: false, message: err });
  //   }
  // })

  connection.query('SELECT * FROM orders', (err, results) => {
    if (err) {
      res.status(500).json({ status: false, message: 'Error fetching payments from database', error: err });
    } else {
      res.status(200).json({ status: true, message: 'Success', results });
    }
  });

}

function fetch_single_order(req, res) {
  const { order_id } = req.params;
  razorpayInstance.orders.fetch(order_id, (err, razorpayData) => {
    if (razorpayData) {
      connection.query(`SELECT * FROM orders`, (err, orderData) => {
        if (err) throw err;
        res.send({ status: true, message: 'Success', data: orderData });
      });
    } else {
      res.json({ err });
    }
  });
}

module.exports = { create_order, fetch_order, fetch_single_order }
