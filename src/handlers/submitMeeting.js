export const handleMeetingSubmission = async (interaction) => {
  const title = interaction.fields.getTextInputValue('title').trim();
  const agenda = interaction.fields.getTextInputValue('agenda').trim();
  const timestamp = Number(interaction.fields.getTextInputValue('timestamp').trim());

  const announcement = await interaction.reply({
    content: `# ${title}\n` + `*Scheduled for: <t:${timestamp}:F>*\n\n` + `${agenda}`,
    fetchReply: true,
  });

  const thread = await announcement.startThread({
    name: title,
  });
};
