import { Schema, model } from 'mongoose';

const transaction_schema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true, // Reference to the customer for whom this transaction is made
      },
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      description: {
        type: String,
        trim: true,
      }
});

const transaction_model=model('Transaction',transaction_schema);

export default transaction_model;