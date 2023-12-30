export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ALLOWED_SLACK_CHANNEL_IDS: string;
      SLACK_SIGNING_SECRET: string;
      SLACK_CLIENT_ID: string;
      SLACK_CLIENT_SECRET: string;
      PROJECT_ID: string;
      SERVICE_ACCOUNT_EMAIL: string;
      SERVICE_ACCOUNT_PRIVATE_KEY_BASE64: string;
      DATABASE_ID: string;
    }
  }
}
