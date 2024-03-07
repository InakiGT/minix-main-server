import { Router } from 'express';
import passport, { session } from 'passport';

import { CreateUser, UpdateUser } from '../models/User.models';
import UserService from '../services/user.service';

const router = Router();

const userService = new UserService();

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const data = await userService.FindById(id);

        res.status(200).json({
            msg: 'OK',
            data,
        })
    } catch(err) {
        res.status(500).json({
            msg: 'Internal Server Error',
        });
    }
});

router.post('/', async ( req, res ) => {
    try {
        const data: CreateUser = req.body;    
        await userService.Create(data);

        const response: any = data;
        delete response.password;

        res.status(201).json({
            msg: 'User created',
            data: response,
        });
    } catch(err) {
        res.status(500).json({
            msg: 'Internal Server Error',
        });
    }
});

router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const id = req.params.id;
            const data: UpdateUser = req.body;

            await userService.Update(id, data);
            delete data.password;

            res.status(200).json({
                msg: 'User updated',
                data,
            });
        } catch(err) {
            res.status(500).json({
                msg: 'Internal Server Error',
            });
        }
});

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const { id } = req.params;
            const { sub } = req.user as any;

            await userService.Delete(id, sub);

            res.status(200).json({
                msg: 'User deleted',
                data: `User with id: ${ id } was deleted`
            })
        } catch(err) {
            res.status(500).json({
                msg: 'Unhauthorizated',
            });
        }
    }
);

export default router;