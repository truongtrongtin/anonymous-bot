import { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import { installationRef } from '../../firestore.js';

export async function appUninstallled({
  body,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<'app_uninstalled'>) {
  await installationRef.doc(body.team_id).delete();
}
