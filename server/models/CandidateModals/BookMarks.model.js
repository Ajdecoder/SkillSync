import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const BookMarkSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    opportunityId: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});