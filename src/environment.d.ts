export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SLACK_BOT_TOKEN: string;
      SLACK_SIGNING_SECRET: string;
      ALLOWED_SLACK_CHANNEL_IDS: string;
    }
  }
}
