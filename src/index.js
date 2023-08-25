import { config } from 'dotenv';
import { Client, IntentsBitField, ChannelType } from 'discord.js';

config();

const pre = '!p ';

const client = new Client({
  intents: [
    1,
    // IntentsBitField.Flags.Guilds,
    // IntentsBitField.Flags.GuildMembers,
    // IntentsBitField.Flags.GuildMessages,
    // IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
  client.user.setActivity({
    name: 'Pengu',
  });
  console.log('bot on bro');
});

client.on('messageCreate', (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.content === pre + 'commands') {
    msg.reply(
      'Hello comrade! I am PravdaAgendaBot, made by my glorius leader ``pengu211`` and great contributer ``mattphantastic``\n# Commands\n'
    );
  }
});
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'create-agenda') {
    const user = interaction.user;
    const Title = interaction.options.getString('title');
    const Agenda = interaction.options.getString('agenda');
    const InviteUser = interaction.options.getUser('invite');
    const Invite = InviteUser ? InviteUser.toString() : null;
    const Timestamp = interaction.options.getString('timestamp');

    const threadName = Title.replace(/\s+/g, '-');
    const finalResultMessage = `### On ${Timestamp} \n# Meeting: ${Title}\n${Agenda}`;
    console.log(finalResultMessage);

    await interaction.reply(finalResultMessage);

    const thread = await interaction.channel.threads.create({
      name: threadName,
      autoArchiveDuration: 60,
      type: 11,
    });

    const threadChannel = await thread.join();

    // Mention the author of the interaction in the new thread
    if (Invite != null) {
      await threadChannel.send(`${finalResultMessage}\n${Invite} ${user}`);
    } else {
      await threadChannel.send(`${finalResultMessage}\n${user}`);
    }
  }
  if (interaction.commandName === 'about') {
    interaction.reply(
      'Hello comrade! I am Secretary, hired by the glorius leader ``pengu211`` and great contributer ``mattphantastic``\n# Commands\n```/create-agenda {Title} {Agenda} {Invite} {Timestamp}```'
    );
  }
});

// node src/index.js
client.login(process.env.token);
