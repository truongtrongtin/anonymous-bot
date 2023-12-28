import { KnownBlock } from '@slack/bolt';
import { checkValidChannel } from '../helpers.js';

export function messageInputBlock({
  channelId,
}: {
  channelId: string;
}): KnownBlock {
  return checkValidChannel(channelId)
    ? {
        type: 'input',
        block_id: 'message-input-block',
        element: {
          type: 'rich_text_input',
          action_id: 'message-input-action',
        },
        label: {
          type: 'plain_text',
          text: 'Message',
        },
      }
    : {
        type: 'section',
        text: {
          type: 'plain_text',
          text: 'This feature has not been enabled for this channel!',
        },
      };
}
