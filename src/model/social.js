import mongoose from 'mongoose';

const socialSchema = new mongoose.Schema(
    {
        network: {
            type: String,
            default: 0,
        },
        count: {
            type: Number,
            default: 0,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                delete ret.__v;
                delete ret.updatedAt;
            },
        },
        timestamps: true,
    }
);

mongoose.models = {};

export default mongoose.model("Social", socialSchema);