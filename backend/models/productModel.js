import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , "Please Enter a Product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter a Product Description"],
    },
    price: {
        type: Number,
        required: [true, "Please Enter a Product Price"],
        maxLength: [7, "Price cannot exceed 7 digits"]
    },
    ratings:{
        type: Number,
        default: 0

    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please Enter a Product Category"],
    },
    stock: {
        type: Number,
        required: [true, "Please Enter a Product Stock"],
        maxlength: [5, "Stock cannot exceed 5 digits"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },  
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Product", productSchema);