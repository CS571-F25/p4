import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI;

if (!connectionString) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

const connectDB = async () => {
    if (mongoose.connection?.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(connectionString);
        console.log('========== Connected to MongoDB ==========');
    } catch (err) {
        console.error('Could not connect to MongoDB:', err);
    }
};

export default connectDB;
