import { messageActionBlock } from "@/blocks/messageActionBlock";
import { Env } from "@/main";
import { ViewSubmissionLazyHandler } from "slack-cloudflare-workers";

export const postReplyMessageFromModal: ViewSubmissionLazyHandler<
  Env
> = async ({ payload, context }) => {
  const { messageTs, channelId } = JSON.parse(payload.view.private_metadata);
  const richTextBlock =
    payload.view.state.values["message-input-block"]["message-input-action"]
      .rich_text_value!;

  await context.client.chat.postMessage({
    channel: channelId,
    thread_ts: messageTs,
    text: "New anonymous message!",
    blocks: [
      richTextBlock,
      messageActionBlock({ upUserIds: [], downUserIds: [] }),
    ],
  });
};
