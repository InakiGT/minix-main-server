import { Router } from 'express';
import passport from 'passport';

import AuthService from '../services/auth.service';

const router = Router();
const authService = new AuthService();

router.post('/', 
    passport.authenticate('local', { session: false }),
    ( req, res ) => {
        try {
            const { user, token } = authService.SignToken(req.user);

            res.json({
                user,
                token,
            });
        } catch(err) {
            res.status(400).json({
                msg: 'Unhauthorized',
            })
        }
});

export default router;