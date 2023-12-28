import {
  AllMiddlewareArgs,
  GlobalShortcut,
  SlackShortcutMiddlewareArgs,
} from '@slack/bolt';

export async function showNewMessageModalFromGlobalShortcut({
  shortcut,
  ack,
  client,
}: AllMiddlewareArgs & SlackShortcutMiddlewareArgs<GlobalShortcut>) {
  await ack();
  await client.views.open({
    trigger_id: shortcut.trigger_id,
    view: {
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
      type: 'modal',
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
      ],
    },
  });
}
