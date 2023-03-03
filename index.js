require("dotenv").config()//Includes the TOKEN from .env for the login
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
const prefix = "&&"//Set the prefix
const prompt = require("prompt-sync")({sigint: true})//Module to allow user input in the console
const sqlite = require("sqlite3").verbose()//SQL Database module

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))//Command Handler, reads file with commands
for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)// with the key as the command name and the value as the exported module
}

client.on("ready", (client) => { // When the client is ready, run this code (only once)
    console.log(`${client.user.username} is ready!`)//Feedback in the console to show the bot is online.
    client.user.setActivity("Rocket League / &&help", {
        type: ActivityType.Playing,
      })

    let db = new sqlite.Database('./NameOfTeams.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE)
    db.run(`CREATE TABLE IF NOT EXISTS data(teamnames INTEGER NOT NULL, teamcaptain TEXT NOT NULL)`)
})

client.on('messageCreate', (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;//commands without the prefix, or other bots get ignored
    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase();

    if (message.content.startsWith(`${prefix}ping`)) 
    {
        if (message.member.roles.cache.some(r => ["eComp Manager"].includes(r.name)))
        {
            client.commands.get('ping').execute(client, message, args, Discord)
        }
        else 
        { 
            const youDontHaveEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle(`${message.author.tag}  <:no_entry:1030145886652727407> <:no_entry:1030145886652727407> <:no_entry:1030145886652727407>`)
            .setDescription(`You can only use this command if you have the **eComp Manager** role.
                             Ask the admin of the server to create and/or assign you this role.`)
            return message.channel.send({ embeds: [youDontHaveEmbed] })
            //return message.channel.send(`You are not an admin ${message.author}!`);
        }
    }
    else if (message.content.startsWith(`${prefix}registerteam`)) 
    {
        if (message.member.roles.cache.some(r => ["eComp Manager"].includes(r.name)))
        {
             client.commands.get('registerteam').execute(client, message, args, Discord)
        }
        else 
        { 
            const youDontHaveEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle(`${message.author.tag}  <:no_entry:1030145886652727407> <:no_entry:1030145886652727407> <:no_entry:1030145886652727407>`)
            .setDescription(`You don't have the **eComp Manager** role.
                             Ask an admin to assign you this role, and then try again.

                             *If this role doesn't exist in your server, execute* **&&start** *to create it.*`)
            return message.channel.send({ embeds: [youDontHaveEmbed] })
        }
    }
    else if (message.content.startsWith(`${prefix}updateteam`)) 
    {
        client.commands.get('updateteam').execute(client, message, args, Discord)
    }
    else if (message.content.startsWith(`${prefix}deleteteam`)) 
    {
        if (message.member.roles.cache.some(r => ["eComp Manager"].includes(r.name)))
        {
        client.commands.get('deleteteam').execute(client, message, args, Discord)
        }
        else 
        { 
            const youDontHaveEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle(`${message.author.tag}  <:no_entry:1030145886652727407> <:no_entry:1030145886652727407> <:no_entry:1030145886652727407>`)
            .setDescription(`You don't have the **eComp Manager** role.
                             Ask an admin to assign you this role, and then try again.

                             *If this role doesn't exist in your server, execute* **&&start** *to create it.*`)
            return message.channel.send({ embeds: [youDontHaveEmbed] })
        }
    }
    else if (message.content.startsWith(`${prefix}teams`)) 
    {
        client.commands.get('teams').execute(client, message, args, Discord)
    }
    else if (message.content.startsWith(`${prefix}start`)) 
    {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator))//IF YOU DONT HAVE ADMIN PERMS, YOU CANT RUN
        {
            const youreNotAdminEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle(`${message.author.tag}  <:no_entry:1030145886652727407> <:no_entry:1030145886652727407> <:no_entry:1030145886652727407>`)
            .setDescription(`You do not have **Administrative** permissions!
                             Ask the admin of the server to execute this command.`)
            return message.channel.send({ embeds: [youreNotAdminEmbed] })
        }
        else 
        {
        client.commands.get('start').execute(client, message, args, Discord)
        }
    }
    else if (message.content.startsWith(`${prefix}help`)) 
    {
        client.commands.get('help').execute(client, message, args, Discord)
    }
    else if (message.content.startsWith(`${prefix}register`)) 
    {
        message.channel.send("Enter your team name:")
        if (!message.content == " ")
        {
        client.commands.get('register').execute(client, message, args, Discord)
        }
    }
    /*else if (message.content.startsWith(`${prefix}args-info`)) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        message.channel.send(`${args}`);
    }*/
})

client.login(process.env.TOKEN)