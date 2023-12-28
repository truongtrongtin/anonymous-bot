const allowedChannelIds = process.env.ALLOWED_SLACK_CHANNEL_IDS.split(',');

export function checkValidChannel(channelId: string) {
  return allowedChannelIds.includes(channelId);
}
