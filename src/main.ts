import slackBolt from '@slack/bolt';
import { installationRef } from './firestore.js';
import { showReplyMessageModal } from './listeners/actions/showReplyMessageModal.js';
import { thumbsDown } from './listeners/actions/thumbsDown.js';
import { thumbsUp } from './listeners/actions/thumbsUp.js';
import { updateModalWhenSelectChannel } from './listeners/actions/updateModalWhenSelectChannel.js';
import { appUninstallled } from './listeners/events/appUninstallled.js';
import { showNewMessageModalFromGlobalShortcut } from './listeners/shortcuts/showNewMessageModalFromGlobalShortcut.js';
import { showReplyMessageModalFromMessageShortcut } from './listeners/shortcuts/showReplyMessageModalFromMessageShortcut.js';
import { postNewMessageFromModal } from './listeners/views/postNewMessageFromModal.js';
import { postReplyMessageFromModal } from './listeners/views/postReplyMessageFromModal.js';
import { ignoreRetry } from './middlewares/ignoreRetry.js';
const { App, ExpressReceiver } = slackBolt;

const expressReceiver = new ExpressReceiver({
  processBeforeResponse: true,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: process.env.DATABASE_ID,
  scopes: ['chat:write', 'chat:write.public', 'commands'],
  installationStore: {
    storeInstallation: async (installation) => {
      if (
        installation.isEnterpriseInstall &&
        installation.enterprise !== undefined
      ) {
        await installationRef.doc(installation.enterprise.id).set(installation);
        return;
      }
      if (installation.team !== undefined) {
        await installationRef.doc(installation.team.id).set(installation);
        return;
      }
      throw new Error('Failed saving installation data to installationStore');
    },
    // @ts-expect-error not type yet
    fetchInstallation: async (installQuery) => {
      if (
        installQuery.isEnterpriseInstall &&
        installQuery.enterpriseId !== undefined
      ) {
        const installation = await installationRef
          .doc(installQuery.enterpriseId)
          .get();
        return installation.data();
      }
      if (installQuery.teamId !== undefined) {
        const installation = await installationRef
          .doc(installQuery.teamId)
          .get();
        return installation.data();
      }
      throw new Error('Failed fetching installation');
    },
    deleteInstallation: async (installQuery) => {
      if (
        installQuery.isEnterpriseInstall &&
        installQuery.enterpriseId !== undefined
      ) {
        await installationRef.doc(installQuery.enterpriseId).delete();
      }
      if (installQuery.teamId !== undefined) {
        await installationRef.doc(installQuery.teamId).delete();
      }
      throw new Error('Failed to delete installation');
    },
  },
});

export const slackApp = new App({
  receiver: expressReceiver,
});

slackApp.use(ignoreRetry);

slackApp.action('channels-select-action', updateModalWhenSelectChannel);
slackApp.action('reply-action', showReplyMessageModal);
slackApp.action('thumbs-up-action', thumbsUp);
slackApp.action('thumbs-down-action', thumbsDown);

slackApp.event('app_uninstalled', appUninstallled);

slackApp.shortcut('global_new_message', showNewMessageModalFromGlobalShortcut);
slackApp.shortcut('message_reply', showReplyMessageModalFromMessageShortcut);

slackApp.view('new-message-submit', postNewMessageFromModal);
slackApp.view('reply-message-submit', postReplyMessageFromModal);

slackApp.error(async (error) => {
  console.error(error);
});

export const expressApp = expressReceiver.app;
