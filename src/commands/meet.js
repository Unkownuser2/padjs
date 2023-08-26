import { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export const meetCommand = async (interaction) => {
  const modal = new ModalBuilder({
    customId: `New Meeting (${interaction.user.id})`,
    title: 'New Meeting',
  });

  modal.addComponents(
    new ActionRowBuilder().addComponents(
      new TextInputBuilder({
        customId: 'title',
        label: 'Title',
        placeholder: "What's main point of the meeting?",
        style: TextInputStyle.Short,
      })
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder({
        customId: 'agenda',
        label: 'Agenda',
        placeholder: 'Briefly explain the points you want to discuss.',
        style: TextInputStyle.Paragraph,
      })
    ),
    new ActionRowBuilder().addComponents(
      new TextInputBuilder({
        customId: 'timestamp',
        label: 'Time',
        placeholder: 'UNIX timestamp',
        style: TextInputStyle.Short,
      })
    )
  );

  await interaction.showModal(modal);
};
