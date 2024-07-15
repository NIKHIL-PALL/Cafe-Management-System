import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import db from './connection.js';
import userRoutes from './routes/user.js';
import categoryRoutes from './routes/category.js';
import productRoutes from './routes/product.js';
import billRoutes from "./routes/bill.js";
import dashboardRoutes from './routes/dashboard.js';
dotenv.config();
const app = express();



app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/bill", billRoutes);

app.use("/dashboard", dashboardRoutes)

db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected to Database")
  app.listen(process.env.DB_PORT, () => {
    console.log(`Server listening on Port : ${process.env.DB_PORT}`);
  });
});
