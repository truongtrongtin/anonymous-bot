import {
  AllMiddlewareArgs,
  SlackViewMiddlewareArgs,
  ViewSubmitAction,
} from '@slack/bolt';
import { messageActionBlock } from '../../blocks/messageActionBlock.js';

export async function postNewMessageFromModal({
  ack,
  view,
  client,
}: AllMiddlewareArgs & SlackViewMiddlewareArgs<ViewSubmitAction>) {
  await ack();
  const channel =
    view.state.values['channels-select-block']['channels-select-action']
      .selected_channel!;
  const richTextBlock =
    view.state.values['message-input-block']['message-input-action']
      .rich_text_value!;
  await client.chat.postMessage({
    channel,
    text: 'New anonymous message!',
    blocks: [
      richTextBlock,
      messageActionBlock({ upUserIds: [], downUserIds: [] }),
    ],
  });
}
