import dotenv from 'dotenv';

dotenv.config();

export default {
    mongoUrl: process.env.MONGODB_URI,
    clueJWT: process.env.CLUE_JWT_SECRET,
    Persistence_Type: process.env.PERSISTENCE_TYPE,
    github: {
        ClientId: process.env.CLIENT_ID_GITHUB,
        ClientSecret: process.env.CLIENT_SECRET_GITHUB,
        CallbackURL: process.env.CALLBACKURL_GITHUB
    }
}