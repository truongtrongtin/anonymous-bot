import { ActionsBlock } from '@slack/bolt';

export function messageActionBlock({
  upUserIds,
  downUserIds,
}: {
  upUserIds: string[];
  downUserIds: string[];
}): ActionsBlock {
  return {
    type: 'actions',
    elements: [
      {
        type: 'button',
        action_id: 'reply-action',
        text: {
          type: 'plain_text',
          text: 'Reply',
        },
      },
      {
        type: 'button',
        action_id: 'thumbs-up-action',
        text: {
          type: 'plain_text',
          text:
            upUserIds.length > 0
              ? `${upUserIds.length} :thumbsup:`
              : ':thumbsup:',
          emoji: true,
        },
        ...(upUserIds.length > 0 ? { value: upUserIds.join(',') } : {}),
      },
      {
        type: 'button',
        action_id: 'thumbs-down-action',
        text: {
          type: 'plain_text',
          text:
            downUserIds.length > 0
              ? `${downUserIds.length} :thumbsdown:`
              : ':thumbsdown:',
          emoji: true,
        },
        ...(downUserIds.length > 0 ? { value: downUserIds.join(',') } : {}),
      },
    ],
  };
}
