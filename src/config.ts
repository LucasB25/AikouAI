import "dotenv/config";
import { Language } from "./types.js";

export default {
    token: process.env.TOKEN,
    clientId: process.env.CLIENT_ID,
    color: 0x2f3136,
    activity: process.env.ACTIVITY,
    defaultLanguage: process.env.DEFAULT_LANGUAGE || Language.EnglishUS,

    replicateToken: process.env.REPLICATE_TOKEN,
    replicateModel: process.env.REPLICATE_MODEL as any,

    geminiKey: process.env.GEMINI_KEY,
    geminiModel: process.env.GEMINI_MODEL as any,
};
