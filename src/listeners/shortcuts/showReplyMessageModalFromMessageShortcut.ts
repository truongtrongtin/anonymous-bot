import {
  AllMiddlewareArgs,
  MessageShortcut,
  SlackShortcutMiddlewareArgs,
} from '@slack/bolt';
import { replyMessageView } from '../../blocks/replyMessageView.js';

export async function showReplyMessageModalFromMessageShortcut({
  shortcut,
  ack,
  client,
}: AllMiddlewareArgs & SlackShortcutMiddlewareArgs<MessageShortcut>) {
  await ack();
  await client.views.open({
    trigger_id: shortcut.trigger_id,
    view: replyMessageView({
      channelId: shortcut.channel.id,
      messageTs: shortcut.message.ts,
    }),
  });
}
