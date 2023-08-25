import { config } from 'dotenv';
import { REST, Routes, ApplicationCommandOptionType } from 'discord.js';

config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const commands = [
  {
    name: 'about',
    description: 'about',
  },
  {
    name: 'create-agenda',
    description: 'Creates an Agenda',
    options: [
      {
        name: 'title',
        description: 'The title of the Agenda',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'agenda',
        description: 'Explain the Agenda.',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'invite',
        description: 'Who do you want to invite to the agenda? (Users Only!)',
        type: ApplicationCommandOptionType.User,
        required: true,
      },
      {
        name: 'timestamp',
        description: 'The timestamp you want to set. eg: <t:1691674200:F>',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

const rest = new REST().setToken(TOKEN);

(async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log('Successfully registered');
  } catch (error) {
    console.error('Error:', error);
  }
})();

//node src/regist-commands.js
