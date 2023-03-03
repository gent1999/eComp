const sqlite = require("sqlite3").verbose()
const { EmbedBuilder } = require('discord.js');

module.exports = 
{
    name: 'registerteam',
    description: 'Lets users create teams',

    execute(client, message, args, Discord) 
    {
        
        let msg = message.content.toLowerCase()
        let teamnames = `${args}`
        let teamcaptain = message.author.tag
        if (message.author.bot) return
        let db = new sqlite.Database('./NameOfTeams.db', sqlite.OPEN_READWRITE)

        if (!args.length) {
            const exampleEmbed = new EmbedBuilder()
	        .setColor(0xFF0000)
            .setTitle(`${message.author.tag} <:no_entry:1030145886652727407> <:no_entry:1030145886652727407> <:no_entry:1030145886652727407>`)
	        .addFields
            (
		        { name: `Please provide a team name`, value: `&&registerteam team_name` },
            )
            //.setFooter({text: 'eComp', iconURL: 'https://i.imgur.com/Vi9YFgH.png' })
            return message.channel.send({ embeds: [exampleEmbed] })
            //return message.channel.send(`You didn't provide a team name, ${message.author}!`);
        }

        if (!msg == " ") 
        {
            /*const registeringEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`${message.author.tag} <:part_alternation_mark:1030200405809958972>`)
            .setDescription(`Registering ${teamnames}.`)
            message.channel.send({ embeds: [registeringEmbed] })**/
            //message.channel.send("Registering " + teamnames + ".")

            let query = `SELECT * FROM data WHERE teamnames = ?`
            db.get(query, [teamnames], (err, row) => 
            {
                if (err) {
                        console.log(err)
                        message.channel.send("Error!")
                        return
                }
                else if (row === undefined) {
                        let insertdata = db.prepare(`INSERT INTO data VALUES(?,?)`)
                        insertdata.run(teamnames, teamcaptain)
                        insertdata.finalize()
                        db.close()

                        console.log(teamcaptain + " registered " + teamnames)

                        const doneEmbed = new EmbedBuilder()
                        .setColor(0x00FF00)
                        .setTitle(`${message.author.tag} <:white_check_mark:1030203856719720480>`)
                        .setDescription(`Successfully registered ${teamnames}.`)
                        message.channel.send({ embeds: [doneEmbed] }) 
                        //message.channel.send(teamnames + " has been registered.")} , 1500)
                        return
                } 
                else {
                        //message.channel.send(teamnames + " has already been registered! Please choose a different team name.")
                        const alreadyEmbed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle(`${message.author.tag} <:no_entry:1030145886652727407> <:no_entry:1030145886652727407> <:no_entry:1030145886652727407>`)
                        .setDescription(`${teamnames} has already been registered! Please choose a different team name.`)
                        message.channel.send({ embeds: [alreadyEmbed] })
                        return
                }
            })
        }
    }
}