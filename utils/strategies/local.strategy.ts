import { Strategy } from 'passport-local';
import AuthService from '../../services/auth.service';

const authService = new AuthService();

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, async ( email, password, done ) => {
    try {
        const user = await authService.GetUser(email, password);

        done(null, user);
    } catch(err) {
        done(err, false);
    }
});

export default LocalStrategy;