import { messageInputBlock } from "@/blocks/messageInputBlock";
import { Env } from "@/main";
import { BlockActionLazyHandler } from "slack-cloudflare-workers";

export const updateModalWhenSelectChannel: BlockActionLazyHandler<
  "channels_select",
  Env
> = async ({ context, payload, body }) => {
  const channelId =
    body.view.state.values["channels-select-block"]["channels-select-action"]
      .selected_channel;
  if (!channelId) return;

  await context.client.views.update({
    view_id: body.view.id,
    hash: body.view.hash,
    view: {
      type: "modal",
      callback_id: "new-message-submit",
      title: {
        type: "plain_text",
        text: "Send anonymously!",
        emoji: true,
      },
      submit: {
        type: "plain_text",
        text: "Submit",
        emoji: true,
      },
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
        messageInputBlock(),
      ],
    },
  });
};
