import { Env } from "@/main";
import { EventLazyHandler } from "slack-cloudflare-workers";

export const appUninstallled: EventLazyHandler<
  "app_uninstalled",
  Env
> = async ({ context, payload }) => {
  // await installationRef.doc(body.team_id).delete();
};
