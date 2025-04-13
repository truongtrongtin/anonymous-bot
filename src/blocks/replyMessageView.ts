import { messageInputBlock } from "@/blocks/messageInputBlock";
import { ModalView } from "slack-cloudflare-workers";

export function replyMessageView({
  channelId,
  messageTs,
}: {
  channelId: string;
  messageTs: string;
}): ModalView {
  return {
    callback_id: "reply-message-submit",
    title: {
      type: "plain_text",
      text: "Reply anonymously!",
      emoji: true,
    },
    submit: {
      type: "plain_text",
      text: "Submit",
      emoji: true,
    },
    type: "modal",
    close: {
      type: "plain_text",
      text: "Close",
      emoji: true,
    },
    private_metadata: JSON.stringify({ messageTs, channelId }),
    blocks: [messageInputBlock()],
  };
}
