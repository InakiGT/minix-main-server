import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI || 'mongodb://root:example@localhost:27017/?authSource=admin';

const connectMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
    } catch(err) {
        throw new Error(`Error attemping to connect with MongoDB: ${ err }`);
    }
}

export default connectMongo;