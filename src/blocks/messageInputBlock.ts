import { InputBlock } from '@slack/bolt';

export function messageInputBlock(): InputBlock {
  return {
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
  };
}
