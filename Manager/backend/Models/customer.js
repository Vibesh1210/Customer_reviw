import { Schema, model } from 'mongoose';

const customer_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: { 
        type: String, 
        required: true },
    photo: { 
        type: String, 
        required: true },
    pendingAmount: { 
        type: Number, 
        required: true },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true, // Reference to the user who owns this customer
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const customer_model=model('Customer',customer_schema);

export default customer_model;