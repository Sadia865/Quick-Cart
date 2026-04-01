import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: "User" },
    items: [
        {
            product: { type: Object, required: true },
            quantity: { type: Number, required: true },
        }
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Order Placed" },
    date: { type: Number, required: true },
    stripeSessionId: { type: String, default: null }, // ✅ added
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;