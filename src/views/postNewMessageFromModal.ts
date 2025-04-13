import { messageActionBlock } from "@/blocks/messageActionBlock";
import { Env } from "@/main.js";
import { ViewSubmissionLazyHandler } from "slack-cloudflare-workers";

export const postNewMessageFromModal: ViewSubmissionLazyHandler<Env> = async ({
  payload,
  context,
}) => {
  const channel =
    payload.view.state.values["channels-select-block"]["channels-select-action"]
      .selected_channel!;
  const richTextBlock =
    payload.view.state.values["message-input-block"]["message-input-action"]
      .rich_text_value!;
  await context.client.chat.postMessage({
    channel,
    text: "New anonymous message!",
    blocks: [
      richTextBlock,
      messageActionBlock({ upUserIds: [], downUserIds: [] }),
    ],
  });
};
