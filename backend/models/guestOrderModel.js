import mongoose from 'mongoose';

const guestOrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email"]
    },
    phone: {
        type: String,
        required: [true, "Please provide your phone number"]
    },
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        postalCode: { type: String, required: true }
    },
    orderItems: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            image: { type: String },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true
            }
        }
    ],
    paymentInfo: {
        method: { type: String, default: "COD" },
        status: { type: String, default: "Pending" }
    },
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    orderStatus: {
        type: String,
        default: "Processing"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("GuestOrder", guestOrderSchema);
