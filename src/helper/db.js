import mongoose from 'mongoose';

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true,
        });
        console.log("DATABASE CONNECTED");
    } catch (error) {
        console.error("Failed to connect with database");
        console.error(error);
    }
};

