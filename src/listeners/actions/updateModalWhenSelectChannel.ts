import {
  AllMiddlewareArgs,
  BlockChannelsSelectAction,
  SlackActionMiddlewareArgs,
} from '@slack/bolt';
import { messageInputBlock } from '../../blocks/messageInputBlock.js';
import { checkValidChannel } from '../../helpers.js';

export async function updateModalWhenSelectChannel({
  ack,
  action,
  body,
  client,
}: AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockChannelsSelectAction>) {
  await ack();
  if (!body.view) return;
  const channelId = action.selected_channel;

  await client.views.update({
    view_id: body.view.id,
    hash: body.view.hash,
    view: {
      type: 'modal',
      callback_id: 'new-message-submit',
      title: {
        type: 'plain_text',
        text: 'Send anonymously!',
        emoji: true,
      },
      ...(checkValidChannel(channelId)
        ? {
            submit: {
              type: 'plain_text',
              text: 'Submit',
              emoji: true,
            },
          }
        : {}),
      close: {
        type: 'plain_text',
        text: 'Close',
        emoji: true,
      },
      blocks: [
        {
          type: 'section',
          block_id: 'channels-select-block',
          text: {
            type: 'plain_text',
            text: 'Select a channel',
          },
          accessory: {
            type: 'channels_select',
            action_id: 'channels-select-action',
          },
        },
        messageInputBlock({ channelId }),
      ],
    },
  });
}
