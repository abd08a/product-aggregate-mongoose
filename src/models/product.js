import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true, min: 3 },
  description: { type: String, required: true },
});

export default mongoose.model("Product", productSchema);
