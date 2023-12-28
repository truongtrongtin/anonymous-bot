import {
  AllMiddlewareArgs,
  BlockChannelsSelectAction,
  SlackActionMiddlewareArgs,
} from '@slack/bolt';
import { messageInputBlock } from '../../blocks/messageInputBlock.js';

export async function updateModalWhenSelectChannel({
  ack,
  action,
  body,
  client,
}: AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockChannelsSelectAction>) {
  await ack();
  if (!body.view) return;
  const allowedChannelIds = process.env.ALLOWED_SLACK_CHANNEL_IDS.split(',');

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
      submit: {
        type: 'plain_text',
        text: 'Submit',
        emoji: true,
      },
      close: {
        type: 'plain_text',
        text: 'Cancel',
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
        allowedChannelIds.includes(action.selected_channel)
          ? messageInputBlock()
          : {
              type: 'section',
              text: {
                type: 'plain_text',
                text: 'This channel is restricted by admin, please choose another one!',
              },
            },
      ],
    },
  });
}
