import express from "express";
import {
  CREATE_PRODUCT,
  CREATE_PRODUCT_AND_ADD_TO_CART,
  ADD_PRODUCT_TO_CART,
  GET_ALL_PRODUCTS,
  GET_PAGINATED_PRODUCTS,
  DELETE_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  DELETE_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
} from "../controllers/product.js";
import auth from "../middlewares/auth.js";
import validation from "../middlewares/validation.js";
import taskValidationSchema from "../validationSchemas/product.js";

const router = express.Router();

router.post(
  "/products",
  validation(taskValidationSchema),
  auth,
  CREATE_PRODUCT
);
router.post("/products/:cartId", auth, CREATE_PRODUCT_AND_ADD_TO_CART); //create product and add simultaneously to the specific cart
router.post("/addProductToCart/:cartId/:productId", auth, ADD_PRODUCT_TO_CART); // reikia kelti ne uuid sugeneruota id, o mongoose objektinio tipo id
router.get("/products", auth, GET_ALL_PRODUCTS);
router.get("/paginated-products", auth, GET_PAGINATED_PRODUCTS);
router.delete("/products", auth, DELETE_ALL_PRODUCTS);
router.get("/products/:id", auth, GET_PRODUCT_BY_ID);
router.put("/products/:id", auth, UPDATE_PRODUCT_BY_ID);
router.delete("/products/:id", auth, DELETE_PRODUCT_BY_ID);

export default router;
