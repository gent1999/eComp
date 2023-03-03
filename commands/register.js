const { Discord, 
    Client, 
    GatewayIntentBits, 
    messageLink, 
    EmbedBuilder, 
    PermissionsBitField,
    Permissions, 
    PermissionFlagsBits, 
    DiscordAPIError, 
    Collection, 
    GuildMemberRoleManager, 
    GuildMessages,
    GuildMember,
    GuildMemberManager,
    GuildManager,
    User,
    ActivityType, 
    Guild,
    Role,
    RoleManager} = require("discord.js") // Require the necessary discord.js classes
const client = new Client ({
intents: [ GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildPresences ] // Create a new client instance
})
const fs = require("fs")//File system module used for the command handler

module.exports = 
{
    name: 'register',
    description: 'Lets users create teams',
    execute(client, message, args, Discord) 
    {

                team = message.content
                message.channel.send(team)

            
        /*client.registering = new Collection()
        const registeredFiles = fs.readdirSync('./registered/').filter(file => file.endsWith('.js'))//Command Handler, reads file with commands
        for(const file of registeredFiles)
        {
            const registered = require(`./registered/${file}`)
            client.registering.set(registered.name, registered)// with the key as the command name and the value as the exported module
        }
        message.channel.send("Enter your team name:")

        client.on('messageCreate', (message) => 
        {
            if(!message.content.startsWith(prefix) || message.author.bot) return;//commands without the prefix, or other bots get ignored
            const args = message.content.slice(prefix.length).split(/ +/)

            if (!message.content == " ") 
            {
                message.channel.send("ok")
                client.registering.get('team').execute(client, message, args, Discord)
            }
        })*/
        
    }  
}