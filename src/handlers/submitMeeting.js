import { config } from 'dotenv';
import { GuildScheduledEventPrivacyLevel, GuildScheduledEventEntityType } from 'discord.js';

config();

const VOICE_CHANNEL_ID = process.env.VOICE_CHANNEL_ID;

export const handleMeetingSubmission = async (interaction) => {
  const title = interaction.fields.getTextInputValue('title').trim();
  const agenda = interaction.fields.getTextInputValue('agenda').trim();
  const timestamp = Number(interaction.fields.getTextInputValue('timestamp').trim());

  const event = await interaction.guild.scheduledEvents.create({
    name: title,
    description: `Meeting of <t:${timestamp}:F>.`,
    scheduledStartTime: timestamp * 1000,
    privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
    entityType: GuildScheduledEventEntityType.Voice,
    channel: VOICE_CHANNEL_ID,
  });

  const eventInviteURL = await event.createInviteURL();

  const announcement = await interaction.reply({
    content: `# ${title}\n` + `*Scheduled for: <t:${timestamp}:F>*\n\n` + `${agenda}\n\n` + `${eventInviteURL}`,
    fetchReply: true,
  });

  const thread = await announcement.startThread({
    name: title,
  });

  await event.setDescription(event.description + `\n\nJoin <#${thread.id}> for more.`);
};
