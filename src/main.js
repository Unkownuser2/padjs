import { config } from 'dotenv';
import { Client, IntentsBitField, SlashCommandBuilder, REST, Routes } from 'discord.js';
import { interactionCreate } from './interactionCreate.js';

config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageTyping,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildIntegrations,
    IntentsBitField.Flags.GuildScheduledEvents,
    IntentsBitField.Flags.GuildModeration,
  ],
});

// prettier-ignore
const commands = [
  new SlashCommandBuilder().setName('meet').setDescription('Announce an upcoming meeting'),
];

const rest = new REST().setToken(TOKEN);

(async function main() {
  try {
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    console.log('Registered application (/) commands');

    await client.login(TOKEN);
    console.log('Logged in the client');

    client.on('interactionCreate', interactionCreate);
  } catch (error) {
    console.error('An unexpected error occured, quitting...');
    console.error('________________________________________');
    console.error(error);
  }
})();

// node src/main.js
