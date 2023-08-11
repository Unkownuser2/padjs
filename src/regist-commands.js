require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

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
            
        ]
    }
];


const rest = new REST().setToken(process.env.token);

(async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.client_id, process.env.guild_id),
            { body: commands },
        );
        console.log('Successfully registered');
    } catch (error) {
        console.error('Error:', error);
    }
})();

//node src/regist-commands.js