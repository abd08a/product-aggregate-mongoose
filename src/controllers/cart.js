import CartModel from "../models/cart.js";

const ADD_CART = async (req, res) => {
  try {
    const cart = new CartModel({
      date: req.body.date,
      userEmail: req.body.userEmail,
      userCartProducts: req.body.userCartProducts,
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
    const cart = await CartModel.findById(req.params.id);
    return res.status(200).json({ cart: cart });
  } catch (err) {
    console.log("HANDLED ERROR", err);
    return res.status(500).json({ message: "error happened" });
  }
};

export { ADD_CART, GET_CART_BY_ID };
