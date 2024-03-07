import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserService from './user.service';
import { AuthUser } from '../models/User.models';
import config from '../config/config';

class AuthService {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async GetUser(email: string, password: string) {
        const [ user ] = await this.userService.Find({ email });

        if (!user) {
            throw new Error('Unhauthorized');
        }

        const isMatch = await bcrypt.compare(password, user.password.toString());

        if (!isMatch) {
            throw new Error('Unhauthorized');
        }

        return {
            id: user._id,
            username: user.username,
            email: user.email,
        };
    }

    SignToken(user: AuthUser) {
        const payload = {
            sub: user?.id,
        }

        const token = jwt.sign( payload, config.jwtSecret );
        return {
            user,
            token,
        }
    }
}

export default AuthService;