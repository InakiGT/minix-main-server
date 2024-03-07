import mongoose, { Schema } from 'mongoose';
import { commentSchema } from './Coment.model';

interface IPost extends Document {
    authorId: String;
    content: String;
    img?: String;
    video?: String;
    comments?: [];
}

const postSchema = new Schema({
    authorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true },
    img: { type: String, required: false },
    video: { type: String, required: false },
    comments: { type: [ commentSchema ], required: false },
    hashtags: { type: [ String ], required: false },
});

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;