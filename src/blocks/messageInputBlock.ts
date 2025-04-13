import { ViewInputBlock } from "slack-cloudflare-workers";

export function messageInputBlock(): ViewInputBlock {
  return {
    type: "input",
    block_id: "message-input-block",
    element: {
      type: "rich_text_input",
      action_id: "message-input-action",
    },
    label: {
      type: "plain_text",
      text: "Message",
    },
  };
}
