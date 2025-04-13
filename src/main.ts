import { showReplyMessageModal } from "@/actions/showReplyMessageModal";
import { thumbsDown } from "@/actions/thumbsDown";
import { thumbsUp } from "@/actions/thumbsUp";
import { updateModalWhenSelectChannel } from "@/actions/updateModalWhenSelectChannel";
import { appUninstallled } from "@/events/appUninstallled";
import { showNewMessageModalFromGlobalShortcut } from "@/shortcuts/showNewMessageModalFromGlobalShortcut";
import { showReplyMessageModalFromMessageShortcut } from "@/shortcuts/showReplyMessageModalFromMessageShortcut";
import { postNewMessageFromModal } from "@/views/postNewMessageFromModal";
import { postReplyMessageFromModal } from "@/views/postReplyMessageFromModal";
import {
  KVInstallationStore,
  KVStateStore,
  SlackOAuthAndOIDCEnv,
  SlackOAuthApp,
} from "slack-cloudflare-workers";

export type Env = SlackOAuthAndOIDCEnv & {
  SLACK_INSTALLATIONS: KVNamespace;
  SLACK_OAUTH_STATES: KVNamespace;
};

async function noopAckHandler() {}

export default {
  async fetch(
    request: Request,
    env: Env,
    context: ExecutionContext,
  ): Promise<Response> {
    const app = new SlackOAuthApp({
      env,
      installationStore: new KVInstallationStore(env, env.SLACK_INSTALLATIONS),
      stateStore: new KVStateStore(env.SLACK_OAUTH_STATES),
    })
      .action(
        "channels-select-action",
        noopAckHandler,
        updateModalWhenSelectChannel,
      )
      .action("reply-action", noopAckHandler, showReplyMessageModal)
      .action("thumbs-up-action", noopAckHandler, thumbsUp)
      .action("thumbs-down-action", noopAckHandler, thumbsDown)
      .event("app_uninstalled", appUninstallled)
      .globalShortcut(
        "global_new_message",
        noopAckHandler,
        showNewMessageModalFromGlobalShortcut,
      )
      .messageShortcut(
        "message_reply",
        noopAckHandler,
        showReplyMessageModalFromMessageShortcut,
      )
      .viewSubmission(
        "new-message-submit",
        noopAckHandler,
        postNewMessageFromModal,
      )
      .viewSubmission(
        "reply-message-submit",
        noopAckHandler,
        postReplyMessageFromModal,
      );
    return await app.run(request, context);
  },
} satisfies ExportedHandler<Env>;
