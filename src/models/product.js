import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: { type: String, required: true, min: 3 },
  description: { type: String, required: true },
});

export default mongoose.model("Product", productSchema);
