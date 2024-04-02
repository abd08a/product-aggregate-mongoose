import mongoose from "mongoose";

const cartGroupSchema = mongoose.Schema({
  date: { type: String, required: true },
  userEmail: { type: String, required: true, min: 3 },
  userCartProducts_ids: { type: Array },
});

export default mongoose.model("CartGroup", cartGroupSchema);
