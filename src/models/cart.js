import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  date: { type: String, required: true },
  userEmail: { type: String, required: true, min: 3 },
  userCartProducts: { type: Array },
});

export default mongoose.model("Cart", cartSchema);
