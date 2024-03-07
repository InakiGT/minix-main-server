export interface AuthUser {
    id: String;
    username: String;
    email: String;
}

export interface CreateUser {
    username: String;
    email: String;
    password: String;
    photo: String;
}

export interface UpdateUser {
    id?: String;
    username?: String;
    email?: String;
    password?: String;
    photo?: String;
}