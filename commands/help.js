const { EmbedBuilder } = require('discord.js');

module.exports = 
{
    name: 'help',
    description: 'help shows all commands',
    execute(client, message, args, Discord)
    {
        // inside a command, event listener, etc.
        const exampleEmbed = new EmbedBuilder()
	    .setColor(0x0099FF)
	    .setTitle(`eComp's Command List`)
	    .setURL('https://github.com/gent1999')
        .setThumbnail('https://i.imgur.com/Vi9YFgH.png')
        .setDescription
        (
`View the documentation here: https://github.com/gent1999

▬▬▬▬▬▬▬▬▬▬▬▬▬▬

**&&help**
Brings this menu up again.
**&&start**
Creates the **eComp Manager** role. (Necessary for bot's usage)

**&&registerteam team_name
&&deleteteam team_name
&&teams**`       
        )

        //.setFooter({ text: 'View the documentation here: https://github.com/gent1999' })
        message.channel.send({ embeds: [exampleEmbed] });
    }
}