import express from "express";
import {
  CREATE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PAGINATED_PRODUCTS,
  DELETE_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  DELETE_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
} from "../controllers/product.js";
const router = express.Router();

router.post("/products", CREATE_PRODUCT);
router.get("/products", GET_ALL_PRODUCTS);
router.get("/paginated-products", GET_PAGINATED_PRODUCTS);
router.delete("/products", DELETE_ALL_PRODUCTS);
router.get("/products/:id", GET_PRODUCT_BY_ID);
router.put("/products/:id", UPDATE_PRODUCT_BY_ID);
router.delete("/products/:id", DELETE_PRODUCT_BY_ID);

export default router;
