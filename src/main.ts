import slackBolt from '@slack/bolt';
import { showReplyMessageModal } from './listeners/actions/showReplyMessageModal.js';
import { thumbsDown } from './listeners/actions/thumbsDown.js';
import { thumbsUp } from './listeners/actions/thumbsUp.js';
import { updateModalWhenSelectChannel } from './listeners/actions/updateModalWhenSelectChannel.js';
import { showNewMessageModalFromGlobalShortcut } from './listeners/shortcuts/showNewMessageModalFromGlobalShortcut.js';
import { showReplyMessageModalFromMessageShortcut } from './listeners/shortcuts/showReplyMessageModalFromMessageShortcut.js';
import { postNewMessageFromModal } from './listeners/views/postNewMessageFromModal.js';
import { postReplyMessageFromModal } from './listeners/views/postReplyMessageFromModal.js';
import { ignoreRetry } from './middlewares/ignoreRetry.js';
const { App, ExpressReceiver } = slackBolt;

const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  processBeforeResponse: true,
});

export const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: expressReceiver,
});

slackApp.use(ignoreRetry);

slackApp.action('channels-select-action', updateModalWhenSelectChannel);
slackApp.action('reply-action', showReplyMessageModal);
slackApp.action('thumbs-up-action', thumbsUp);
slackApp.action('thumbs-down-action', thumbsDown);

slackApp.shortcut('global_new_message', showNewMessageModalFromGlobalShortcut);
slackApp.shortcut('message_reply', showReplyMessageModalFromMessageShortcut);

slackApp.view('new-message-submit', postNewMessageFromModal);
slackApp.view('reply-message-submit', postReplyMessageFromModal);

slackApp.error(async (error) => {
  console.error(error);
});

export const expressApp = expressReceiver.app;
