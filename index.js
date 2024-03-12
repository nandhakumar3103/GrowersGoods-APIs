const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const db = require("./connection/db")

const farmerRouter = require("./router/farmerRouter");
const categoryRouter = require("./router/categoryRouter");
const userRouter = require('./router/userRouter');
const orderRouter = require('./router/orderRouter');
const paymentRoute = require('./router/paymentRouter');
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

db.connect((err) => {
  if (err) throw err;
  console.log("DB Connected");
});

app.use("/farmer", farmerRouter);
app.use("/category", categoryRouter);
app.use("/users", userRouter);
app.use("/order", orderRouter);
app.use("", paymentRoute);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running in ${process.env.PORT || 3001}`);
});
