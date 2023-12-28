import {
  AllMiddlewareArgs,
  BlockButtonAction,
  SlackActionMiddlewareArgs,
} from '@slack/bolt';
import { messageActionBlock } from '../../blocks/messageActionBlock.js';

export async function thumbsUp({
  ack,
  body,
  client,
}: AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockButtonAction>) {
  await ack();
  if (!body.message || !body.channel) return;
  const userId = body.user.id;

  const upValue: string = body.message.blocks[1].elements[1].value;
  const upUserIds = upValue ? upValue.split(',') : [];
  const newUpUserIds = upUserIds.includes(userId)
    ? upUserIds.filter((id) => id !== userId)
    : [...upUserIds, userId];

  const downValue: string = body.message.blocks[1].elements[2].value;
  const downUserIds = downValue ? downValue.split(',') : [];
  const newDownUserIds = downUserIds.filter((id) => id !== userId);

  await client.chat.update({
    ts: body.message.ts,
    channel: body.channel.id,
    text: body.message.text,
    blocks: [
      body.message.blocks[0],
      messageActionBlock({
        upUserIds: newUpUserIds,
        downUserIds: newDownUserIds,
      }),
    ],
  });
}
