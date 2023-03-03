const { EmbedBuilder, Guild, GuildMemberRoleManager, PermissionsBitField, Role } = require('discord.js')

module.exports = 
{
    name: 'start',
    description: 'This is a getstarted command!',

    execute(client, message, args, Discord) 
    {
        //if (message.member.permissions.has(PermissionsBitField.Flags.Administrator))//YOU NEED TO HAVE ADMIN PRIVELEGES TO RUN THIS
        //{
        let roleName = 'eComp Manager'
        let role = message.guild.roles.cache.find(x => x.name === roleName)
        if (role === undefined) // Role doesn't exist, safe to create
        {
            message.guild.roles.create({ name: 'eComp Manager', 
            permissions: [PermissionsBitField.Flags.SendMessages] })

            const startingEmbed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle(`${message.author.tag} <:part_alternation_mark:1030200405809958972>`)
            .setDescription(`I created an **eComp Manager** role. <:white_check_mark:1030203856719720480>
                             This role unlocks the ability to __register__, __update__, and __delete__ teams.
                             Assign it to who ever you deem responsible.
                             
                             *Do not delete nor change the name of **eComp Manager** role,
                              or else those commands won't be usable anymore.
                              If you delete the role, you must run the **&&start** command again.*`)
            message.channel.send({ embeds: [startingEmbed] })

            //return message.channel.send(`${message.author}, it worked!`)
        } 
        else // Role exists
        {
            const dontstartEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle(`${message.author.tag} <:part_alternation_mark:1030200405809958972>`)
            .setDescription(`The **eComp Manager** role already exists! <:no_entry:1030145886652727407> <:no_entry:1030145886652727407> <:no_entry:1030145886652727407>
                             Assign the role to users you deem responsible, and begin managing your league.
                              
                             *Use **&&help** to see the command lists.*`)
            message.channel.send({ embeds: [dontstartEmbed] })
        }
        //}
    }
}