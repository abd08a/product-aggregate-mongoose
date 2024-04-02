import ProductModel from "../models/product.js";

let products = [];

const CREATE_PRODUCT = async (req, res) => {
  try {
    const product = new ProductModel({
      title: req.body.title,
      description: req.body.description,
    });

    const response = await product.save();

    return res
      .status(201)
      .json({ status: "Product was created", response: response });
  } catch (err) {
    console.log("HANDLED ERROR", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const GET_ALL_PRODUCTS = async (req, res) => {
  try {
    const products = await ProductModel.find();

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
    const product = await ProductModel.findById(req.params.id);
    return res.status(200).json({ product: product });
  } catch (err) {
    console.log("HANDLED ERROR", err);
    return res.status(500).json({ message: "error happened" });
  }
};

const UPDATE_PRODUCT_BY_ID = async (req, res) => {
  try {
    const product = await ProductModel.updateOne(
      { _id: req.params.id },
      { ...req.body }
    );

    return res.status(200).json({ message: "updated", product: product });
  } catch (err) {
    console.log("HANDLED ERROR", err);
    return res.status(500).json({ message: "error happened" });
  }
};

// const UPDATE_PRODUCT_BY_ID = (req, res) => {
//   const isProductExists = products.some(
//     (product) => product.id === req.params.id
//   );

//   if (!isProductExists) {
//     return res
//       .status(404)
//       .json({ message: `Product with id ${req.params.id} was not found` });
//   }

//   const index = products.findIndex((product) => {
//     return product.id === req.params.id;
//   });

//   products[index].description = req.body.description;
//   products[index].title = req.body.title;
//   return res.json({ updatedProduct: products[index] });
// };

const DELETE_PRODUCT_BY_ID = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "deleted", product: product });
  } catch (err) {
    console.log("HANDLED ERROR", err);
    return res.status(500).json({ message: "error happened" });
  }
};

export {
  CREATE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PAGINATED_PRODUCTS,
  DELETE_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
  DELETE_PRODUCT_BY_ID,
};
