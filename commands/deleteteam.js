const sqlite = require("sqlite3").verbose()
const { EmbedBuilder } = require('discord.js');

module.exports = 
{
    name: 'deleteteam',
    description: 'Lets users delete their team',

    execute(client, message, args, Discord) 
    {
        let msg = message.content.toLowerCase()
        let teamnames = `${args}`
        let teamcaptain = message.author.tag
        if (message.author.bot) return
        let db = new sqlite.Database('./NameOfTeams.db')

        if (!args.length) {
            const exampleEmbed = new EmbedBuilder()
	        .setColor(0xFF0000)
            .setTitle(`${message.author.tag} <:no_entry:1030145886652727407> <:no_entry:1030145886652727407> <:no_entry:1030145886652727407>`)
	        .addFields
            (
		        { name: `Please provide a team name`, value: `&&deleteteam team_name` },
            )
            //.setFooter({text: 'eComp', iconURL: 'https://i.imgur.com/Vi9YFgH.png' })
            return message.channel.send({ embeds: [exampleEmbed] })
            //return message.channel.send(`You didn't provide a team name, ${message.author}!`);
        }
        if (!msg == " ") 
        {
            /*const deletingEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`${message.author.tag} <:part_alternation_mark:1030200405809958972>`)
            .setDescription(`Deleting ${teamnames}.`)
            message.channel.send({ embeds: [deletingEmbed] })*/

            let query = `SELECT * FROM data WHERE teamnames = ?`
            db.get(query, [teamnames], (err, row) => 
            {
                if (err) {
                    console.log(err)
                    message.channel.send("Error!")
                    return
            }
                else if (row === undefined) 
                {
                        //message.channel.send(teamnames + " has already been registered! Please choose a different team name.")
                        const alreadyEmbed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle(`${message.author.tag} <:no_entry:1030145886652727407> <:no_entry:1030145886652727407> <:no_entry:1030145886652727407>`)
                        .setDescription(`${teamnames} is not a registered team. Please check your spelling.`)
                        message.channel.send({ embeds: [alreadyEmbed] })
                        return
                } 
                else 
                {
                    let updatedata = db.prepare(`DELETE FROM data WHERE teamnames = ?`)
                    updatedata.run(teamnames)
                    updatedata.finalize()
                    db.close()
                
                    console.log(teamcaptain + " deleted " + teamnames)

                    const doneEmbed = new EmbedBuilder()
                    .setColor(0x00FF00)
                    .setTitle(`${message.author.tag} <:white_check_mark:1030203856719720480>`)
                    .setDescription(`Successfully deleted ${teamnames}.`)
                    message.channel.send({ embeds: [doneEmbed] })
                    return
                }
            }
        )}
    }
}