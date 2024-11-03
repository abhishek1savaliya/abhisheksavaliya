import mongoose from 'mongoose';
import moment from 'moment-timezone';

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
            default: () => moment().tz('Asia/Kolkata').toDate(), 
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

export default mongoose.model('Social', socialSchema);
