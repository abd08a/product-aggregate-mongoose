import { v4 as uuidv4 } from "uuid";
import ProductModel from "../models/product.js";
import CartModel from "../models/cart.js";

const CREATE_PRODUCT = async (req, res) => {
  try {
    console.log(req.body);
    const product = new ProductModel({
      id: uuidv4(),
      ...req.body,
    });

    const response = await product.save();

    // await CartModel.findByIdAndUpdate(req.params.cartId, {
    //   $push: { userCartProducts: product.id },
    // });

    return res
      .status(201)
      .json({ status: "Product was created", response: response });
  } catch (err) {
    console.log("HANDLED ERROR", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const CREATE_PRODUCT_AND_ADD_TO_CART = async (req, res) => {
  try {
    const product = new ProductModel({
      id: uuidv4(),
      title: req.body.title,
      description: req.body.description,
    });

    const response = await product.save();

    await CartModel.findByIdAndUpdate(req.params.cartId, {
      $push: { userCartProducts: product.id },
    });

    return res.status(201).json({
      status: "Product was created and added to specific cart",
      response: response,
    });
  } catch (err) {
    console.log("HANDLED ERROR", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const ADD_PRODUCT_TO_CART = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId;

    // Check if the cart exists
    const cart = await CartModel.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Check if the product exists
    const product = await ProductModel.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Convert productId to string
    const stringProductId =
      typeof productId === "object" ? productId.id : productId;

    // Add productId to the specified cart
    await CartModel.findByIdAndUpdate(cartId, {
      $push: { userCartProducts: stringProductId },
    });

    return res.status(201).json({ status: "Product was added to cart" });
  } catch (err) {
    console.log("HANDLED ERROR", err);
    return res.status(500).json({ message: "Cart or product id is wrong" });
  }
};

const GET_ALL_PRODUCTS = async (req, res) => {
  try {
    const products = await ProductModel.find({ userId: req.body.userId });

    return res.json({ resultProducts: products });
  } catch (err) {
    console.log("HANDLED ERROR", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const GET_PAGINATED_PRODUCTS = async (req, res) => {
  try {
    const products = await ProductModel.find();
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const resultProducts = products.slice(startIndex, endIndex);

    return res.json({ resultProducts: resultProducts });
  } catch (err) {
    console.log("HANDLED ERROR", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const DELETE_ALL_PRODUCTS = (req, res) => {
  products.splice(0, products.length); // Remove all elements from the products array
  return res.json({ status: "All products have been deleted" });
};

const GET_PRODUCT_BY_ID = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ id: req.params.id });
    return res.status(200).json({ product: product });
  } catch (err) {
    console.log("HANDLED ERROR", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const UPDATE_PRODUCT_BY_ID = async (req, res) => {
  try {
    const product = await ProductModel.updateOne(
      { id: req.params.id },
      { ...req.body }
    );

    return res.status(200).json({ message: "updated", product: product });
  } catch (err) {
    console.log("HANDLED ERROR", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const DELETE_PRODUCT_BY_ID = async (req, res) => {
  try {
    const product = await ProductModel.findOneAndDelete({ id: req.params.id });
    return res.status(200).json({ message: "deleted", product: product });
  } catch (err) {
    console.log("HANDLED ERROR", err);
    return res.status(500).json({ message: "error happened" });
  }
};

export {
  CREATE_PRODUCT,
  CREATE_PRODUCT_AND_ADD_TO_CART,
  ADD_PRODUCT_TO_CART,
  GET_ALL_PRODUCTS,
  GET_PAGINATED_PRODUCTS,
  DELETE_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
  DELETE_PRODUCT_BY_ID,
};
