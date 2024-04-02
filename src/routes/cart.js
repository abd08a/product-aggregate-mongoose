import express from "express";
import { ADD_CART, GET_CART_BY_ID } from "../controllers/cart.js";
const router = express.Router();

router.post("/carts", ADD_CART);

router.get("/carts/:id", GET_CART_BY_ID);

export default router;
