// server/models/Shop.js
import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    contactInfo: {
        phone: String,
        email: String,
        address: String
    },
    ratings: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: Number,
        review: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    averageRating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model('Shop', shopSchema);