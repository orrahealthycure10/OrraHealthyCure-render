import GuestOrder from "../models/guestOrderModel.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import ErrorHandler from "../utils/handleError.js";
// @desc    Create a new guest order
export const createGuestOrder = handleAsyncError(async (req, res, next) => {
    const {
        name,
        email,
        phone,
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return next(new ErrorHandler("No order items provided", 400));
    }

    const guestOrder = await GuestOrder.create({
        name,
        email,
        phone,
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    });

    res.status(201).json({
        success: true,
        message: "Guest order created successfully",
        guestOrder
    });
});

// @desc    Get all guest orders (Admin only)
export const getAllGuestOrders = handleAsyncError(async (req, res, next) => {
    const orders = await GuestOrder.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        orders
    });
});

// @desc    Get single guest order by ID
export const getGuestOrderById = handleAsyncError(async (req, res, next) => {
    const order = await GuestOrder.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Guest order not found", 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});
