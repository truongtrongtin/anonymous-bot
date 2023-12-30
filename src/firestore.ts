import { Firestore } from '@google-cloud/firestore';
const privateKey = Buffer.from(
  process.env.SERVICE_ACCOUNT_PRIVATE_KEY_BASE64,
  'base64',
).toString();

export const db = new Firestore({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.SERVICE_ACCOUNT_EMAIL,
    private_key: privateKey,
  },
  databaseId: process.env.DATABASE_ID,
  ignoreUndefinedProperties: true,
});

export const installationRef = db.collection('installation');
