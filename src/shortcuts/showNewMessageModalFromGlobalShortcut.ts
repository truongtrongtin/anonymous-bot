import { Env } from "@/main";
import { GlobalShortcutLazyHandler } from "slack-cloudflare-workers";

export const showNewMessageModalFromGlobalShortcut: GlobalShortcutLazyHandler<
  Env
> = async ({ context, payload }) => {
  await context.client.views.open({
    trigger_id: payload.trigger_id,
    view: {
      title: {
        type: "plain_text",
        text: "Send anonymously!",
        emoji: true,
      },
      type: "modal",
      close: {
        type: "plain_text",
        text: "Close",
        emoji: true,
      },
      blocks: [
        {
          type: "section",
          block_id: "channels-select-block",
          text: {
            type: "plain_text",
            text: "Select a channel",
          },
          accessory: {
            type: "channels_select",
            action_id: "channels-select-action",
          },
        },
      ],
    },
  });
};
