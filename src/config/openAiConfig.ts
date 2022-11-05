import { Configuration } from "openai";

export const configuration = new Configuration({
  apiKey: process.env.DALLE_API_KEY,
});
