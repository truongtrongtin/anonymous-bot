import { messageActionBlock } from "@/blocks/messageActionBlock";
import { Env } from "@/main.js";
import { BlockActionLazyHandler } from "slack-cloudflare-workers";

export const thumbsDown: BlockActionLazyHandler<"button", Env> = async ({
  context,
  body,
  payload,
}) => {
  if (!body.message || !context.channelId) return;
  const userId = body.user.id;

  const upValue: string = body.message.blocks[1].elements[1].value;
  const upUserIds = upValue ? upValue.split(",") : [];
  const newUpUserIds = upUserIds.filter((id) => id !== userId);

  const downValue: string = body.message.blocks[1].elements[2].value;
  const downUserIds = downValue ? downValue.split(",") : [];
  const newDownUserIds = downUserIds.includes(userId)
    ? downUserIds.filter((id) => id !== userId)
    : [...downUserIds, userId];

  await context.client.chat.update({
    ts: body.message.ts,
    channel: context.channelId,
    text: body.message.text,
    blocks: [
      body.message.blocks[0],
      messageActionBlock({
        upUserIds: newUpUserIds,
        downUserIds: newDownUserIds,
      }),
    ],
  });
};
