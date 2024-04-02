// npm i    -- reikia įsirašyti node modulius, jeigu nori paleisti kodą. dabar jie ištrinti kad neužimtų daug vietos siunčiant

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskRouter from "./src/routes/product.js";
import cartRouter from "./src/routes/cart.js";
import "dotenv/config";

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected to DB!"))
  .catch((err) => {
    console.log("err: ", err);
  });

app.use(taskRouter);
app.use(cartRouter);

app.use((req, res) => {
  return res.status(404).json({ status: "Endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`APP STARTED ON PORT ${process.env.PORT}!`);
});
