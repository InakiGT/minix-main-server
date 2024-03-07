import dotenv from 'dotenv';

dotenv.config();

const config = {
    jwtSecret: process.env.JWT_SECRET || '',
    apiKey: process.env.API_KEY,
}

export default config;