import mongoose from "mongoose";
import CartModel from "../models/cart.js";

const ADD_CART = async (req, res) => {
  try {
    const cart = new CartModel({
      date: req.body.date,
      userEmail: req.body.userEmail,
      userCartProducts: [],
    });

    const response = await cart.save();

    return res
      .status(201)
      .json({ status: "Cart was created", response: response });
  } catch (err) {
    console.log("HANDLED ERROR", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const GET_CART_BY_ID = async (req, res) => {
  try {
    const cart = await CartModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "userCartProducts",
          foreignField: "id",
          as: "cartProducts",
        },
      },
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
    ]).exec();

    return res.status(200).json({ cart: cart });
  } catch (err) {
    console.log("HANDLED ERROR", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const GET_ALL_PRODUCTS_IN_CART = async (req, res) => {
  try {
    const productsInCart = await CartModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "userCartProducts",
          foreignField: "id",
          as: "cartProducts",
        },
      },
    ]).exec();

    return res.json({ resultProductsInCart: productsInCart });
  } catch (err) {
    console.log("HANDLED ERROR", err);
    return res.status(500).json({ message: "error happened" });
  }
};

export { ADD_CART, GET_CART_BY_ID, GET_ALL_PRODUCTS_IN_CART };
