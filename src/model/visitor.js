import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema(
    {
        visitorCounts: {
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

export default mongoose.model("Visitor", visitorSchema);