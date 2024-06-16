import mongoose from "mongoose";
const product = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img: [{
        type: String,
    }],
    user_id: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
    },
    rating: {
        type: Number,
        default:null,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
    quantity: {
        type: Number,
        default:1,
    },
    discount: {
        type: Number,
       default:0, 
    },
    review: [{
          userReview: {
            type: String,
       
        },
        userRating: {
            type: Number,
        },
        userName: {
            type: String,
        },
        userEmail: {
            type: String,
         }
    }
    ],
    norating: {
        type: Number,
        default:0,
    }

});
export const Product = new mongoose.model("Product", product);