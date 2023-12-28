import { View } from '@slack/bolt';
import { messageInputBlock } from './messageInputBlock.js';

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
    blocks: [messageInputBlock()],
  };
}
