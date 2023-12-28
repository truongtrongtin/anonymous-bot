import { View } from '@slack/bolt';

export function replyMessageView({
  channelId,
  messageTs,
}: {
  channelId: string;
  messageTs: string;
}): View {
  return {
    callback_id: 'reply-message-submit',
    title: {
      type: 'plain_text',
      text: 'Reply anonymously!',
      emoji: true,
    },
    submit: {
      type: 'plain_text',
      text: 'Submit',
      emoji: true,
    },
    type: 'modal',
    close: {
      type: 'plain_text',
      text: 'Cancel',
      emoji: true,
    },
    private_metadata: JSON.stringify({ messageTs, channelId }),
    blocks: [
      {
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
      },
    ],
  };
}
