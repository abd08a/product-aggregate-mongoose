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
const router = express.Router();

router.post("/products", CREATE_PRODUCT);
router.post("/products/:cartId", CREATE_PRODUCT_AND_ADD_TO_CART); //create product and add simultaneously to the specific cart
router.post("/addProductToCart/:cartId/:productId", ADD_PRODUCT_TO_CART); // reikia kelti ne uuid sugeneruota id, o mongoose objektinio tipo id
router.get("/products", GET_ALL_PRODUCTS);
router.get("/paginated-products", GET_PAGINATED_PRODUCTS);
router.delete("/products", DELETE_ALL_PRODUCTS);
router.get("/products/:id", GET_PRODUCT_BY_ID);
router.put("/products/:id", UPDATE_PRODUCT_BY_ID);
router.delete("/products/:id", DELETE_PRODUCT_BY_ID);

export default router;
