import { replyMessageView } from "@/blocks/replyMessageView";
import { Env } from "@/main";
import { BlockActionLazyHandler } from "slack-cloudflare-workers";

export const showReplyMessageModal: BlockActionLazyHandler<
  "button",
  Env
> = async ({ context, payload, body }) => {
  if (!context.channelId) return;
  await context.client.views.open({
    trigger_id: payload.trigger_id,
    view: replyMessageView({
      channelId: context.channelId,
      messageTs: body.message.ts,
    }),
  });
};
