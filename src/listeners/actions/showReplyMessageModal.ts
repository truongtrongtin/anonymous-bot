import {
  AllMiddlewareArgs,
  BlockButtonAction,
  SlackActionMiddlewareArgs,
} from '@slack/bolt';
import { replyMessageView } from '../../blocks/replyMessageView.js';

export async function showReplyMessageModal({
  ack,
  body,
  client,
}: AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockButtonAction>) {
  await ack();
  if (!body.message || !body.channel) return;
  await client.views.open({
    trigger_id: body.trigger_id,
    view: replyMessageView({
      channelId: body.channel.id,
      messageTs: body.message.ts,
    }),
  });
}
