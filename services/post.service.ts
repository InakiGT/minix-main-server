import Post from '../database/models/Post.model';
import { CreatePost } from '../models/Post.model';

class PostService {
    async Find(query?: any) {
        try {
            const posts = Post.find(query).populate({
                path: 'authorId',
                select: 'username photo',
            });
            
            return posts;
        } catch(err) {
            console.log(err);
            throw new Error(`Error attemping to find posts in DB: ${err}`);
        }
    }

    async FindById(id: string) {
        try {
            const post = Post.findById(id);

            return post;
        } catch(err) {
            console.log(err);
            throw new Error(`Error attemping to find post by id in DB: ${err}`);
        }
    }

    async Create(data: CreatePost) {
        try {
            const post = new Post(data);

            const response = await (await post.save()).populate({
                path: 'authorId',
                select: 'username photo',
            });

            return response;
        } catch(err) {
            console.log(err);
            throw new Error(`Error attemping to create a new User in DB: ${err}`);
        }
    }

    async Aggregate() {
        try {
            const data = await Post.aggregate([
                { $unwind: "$hashtags" },
                { $group: { _id: "$hashtags", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 }
            ]);

            return data;
        } catch(err) {
            console.log(err);
            throw new Error(`Error attemping to aggregate: ${err}`);
        }
    }
}

export default PostService;