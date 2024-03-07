import bcrypt from 'bcrypt';

import User from '../database/models/User.model';
import { CreateUser, UpdateUser } from '../models/User.models';

class UserService {
    async Find(query?: any) {
        try {
            const users = User.find(query);

            return users;
        } catch(err) {
            throw new Error(`Error attemping to find users in DB: ${err}`);
        }
    }

    async FindById(id: String) {
        try {
            const user = await User.findById(id);

            return user;
        } catch(err) {
            throw new Error(`Error attemping to find user by id in DB: ${err}`);
        }
    }

    async Create(data: CreateUser) {
        try {
            const user = new User(data);
            const hash = await bcrypt.hash(user.password.toString(), 10);
            user.password = hash;

            await user.save();

            return true;
        } catch(err) {
            console.log(err);
            throw new Error(`Error attemping to create a new User in DB: ${err}`);
        }
    }

    async Update(id: string, data: UpdateUser) {
        try {
            if (data.password) {
                const hash = await bcrypt.hash(data.password.toString(), 10);
                data.password = hash;
            }
            await User.updateOne({_id: id}, data);

            return true;
        } catch(err) {
            throw new Error(`Error attemping to update a User in DB: ${err}`);
        }
    }

    async Delete(id: string, sub: string) {
        try {
            if (id !== sub) {
                throw new Error('Unhauthorizated');
            } 
            
            await User.deleteOne({ _id: id });

            return true;
        } catch(err) {
            throw new Error(`Error attemping to delete a User in DB: ${err}`);
        }
    }
}

export default UserService;