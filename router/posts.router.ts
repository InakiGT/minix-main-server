import { Router } from 'express';
import PostService from '../services/post.service';
import { CreatePost } from '../models/Post.model';
import passport from 'passport';

const router = Router();

const postService = new PostService();

router.get('/', async (_, res) => {
    try {
        const data = await postService.Find();
        
        res.status(200).json({
            msg: 'OK',
            data: data.reverse(),
        });
    } catch(err) {
        res.status(500).json({
            err: 'Error en la petición'
        });
    }
});

router.get('/getOne/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const data = await postService.FindById(id);

        res.status(200).json({
            msg: 'OK',
            data,
        });
    } catch(err) {
        res.status(500).json({
            err: 'Error en la petición'
        });
    }
});

router.get('/trends', async (req, res) => {
    try {
        const data = await postService.Aggregate();

        res.status(200).json({
            msg: 'OK',
            data,
        });
    } catch(err) {
        res.status(500).json({
            msg: 'Internal Server Error',
        });
    }
});

router.post('/', 
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            console.log(req.body)
            const data: CreatePost = req.body;  
            const { sub } = req.user as any;  
            data.authorId = sub;

            const response = await postService.Create(data);

            res.status(201).json({
                msg: 'Post created',
                data: response,
            });
        } catch(err) {
            res.status(500).json({
                msg: 'Internal Server Error',
            });
        }
});

export default router;