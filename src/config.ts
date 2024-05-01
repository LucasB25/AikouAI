import 'dotenv/config';

export default {
    token: process.env.TOKEN,
    clientId: process.env.CLIENT_ID,
    color: process.env.COLOR,
    replicateToken: process.env.REPLICATE_TOKEN,
    replicateModel: process.env.REPLICATE_MODEL as any,

    googleKey: process.env.GOOGLE_KEY,
    googleModel: process.env.GOOGLE_MODEL as any,
    proxy: process.env.LOCAL_FETCH_PROXY as any,
};
