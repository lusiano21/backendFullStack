import dotenv from 'dotenv';

dotenv.config();

export default {
    mongoUrl: process.env.MONGODB_URI,
    clueJWT: process.env.CLUE_JWT_SECRET,
    Persistence_Type: process.env.PERSISTENCE_TYPE,
    NodeHost: process.env.NODE_HOST,
    NodeEnv: process.env.NODE_ENV,
    NodePort: process.env.NODE_PORT,
    NodeMailer: {
        EmailUser:process.env.EMAIL_USER,
        EmailPass:process.env.EMAIL_PASS
    },
    Twilio:{
        PhoneNumber:process.env.TWILIO_PHONE_NUMBER,
        AccountSid:process.env.TWILIO_ACCOUNT_SID,
        AuthToken:process.env.TWILIO_AUTH_TOKEN,
    },
    github: {
        ClientId: process.env.CLIENT_ID_GITHUB,
        ClientSecret: process.env.CLIENT_SECRET_GITHUB,
        CallbackURL: process.env.CALLBACKURL_GITHUB
    }
}