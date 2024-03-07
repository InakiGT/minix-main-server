export interface CreatePost {
    authorId: String;
    content: String;
    img?: String;
    video?: String;
    hashtags?: [String];
}

export interface UpdatePost {
    authorId: String;
    content?: String;
    img?: String;
    video?: String;
}