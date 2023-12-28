import {
  AllMiddlewareArgs,
  SlackViewMiddlewareArgs,
  ViewSubmitAction,
} from '@slack/bolt';
import { messageActionBlock } from '../../blocks/messageActionBlock.js';

export async function postReplyMessageFromModal({
  ack,
  view,
  client,
}: AllMiddlewareArgs & SlackViewMiddlewareArgs<ViewSubmitAction>) {
  await ack();
  const { messageTs, channelId } = JSON.parse(view.private_metadata);
  const richTextBlock =
    view.state.values['message-input-block']['message-input-action']
      .rich_text_value!;

  await client.chat.postMessage({
    channel: channelId,
    thread_ts: messageTs,
    text: 'New anonymous message!',
    blocks: [
      richTextBlock,
      messageActionBlock({ upUserIds: [], downUserIds: [] }),
    ],
  });
}
