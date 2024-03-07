import mongoose, { Schema } from "mongoose";

interface IUser extends Document {
    username: String;
    email: String;
    password: String;
    photo: String;
}

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, required: false },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;