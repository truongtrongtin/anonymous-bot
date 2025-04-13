import { replyMessageView } from "@/blocks/replyMessageView";
import { Env } from "@/main";
import { MessageShortcutLazyHandler } from "slack-cloudflare-workers";

export const showReplyMessageModalFromMessageShortcut: MessageShortcutLazyHandler<
  Env
> = async ({ context, payload }) => {
  await context.client.views.open({
    trigger_id: payload.trigger_id,
    view: replyMessageView({
      channelId: context.channelId,
      messageTs: payload.message.ts,
    }),
  });
};
