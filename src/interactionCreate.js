import { InteractionType } from 'discord.js';
import { discardLastWord, splitPascalCase } from './utils/utils.js';
import { meetCommand } from './commands/meet.js';
import { handleMeetingSubmission } from './handlers/meetingSubmission.js';

export const interactionCreate = async (interaction) => {
  const incomingLogMessage = 'Incoming ' + splitPascalCase(InteractionType[interaction.type]).toLowerCase();
  try {
    switch (interaction.type) {
      case InteractionType.ApplicationCommand:
        console.log(incomingLogMessage, `interaction (/${interaction.commandName})`);
        switch (interaction.commandName) {
          case 'meet':
            meetCommand(interaction);
            break;
        }
        break;
      case InteractionType.ModalSubmit:
        console.log(incomingLogMessage, `interaction (${discardLastWord(interaction.customId)})`);
        switch (interaction.customId) {
          case `New Meeting (${interaction.user.id})`:
            handleMeetingSubmission(interaction);
            break;
        }
        break;
    }
  } catch (error) {
    console.error(error);
  }
};
