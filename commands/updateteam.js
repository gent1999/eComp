const sqlite = require("sqlite3").verbose()
const { EmbedBuilder } = require('discord.js');

module.exports = 
{
    name: 'updateteam',
    description: 'Lets users update their team',

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
		        { name: `Please provide a team name`, value: `&&updateteam team_name` },
            )
            //.setFooter({text: 'eComp', iconURL: 'https://i.imgur.com/Vi9YFgH.png' })
            return message.channel.send({ embeds: [exampleEmbed] })
            //return message.channel.send(`You didn't provide a team name, ${message.author}!`);
        }

        if (!msg == " ") 
        {
            const updatingEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`${message.author.tag} <:part_alternation_mark:1030200405809958972>`)
            .setDescription(`Updating ${teamnames}.`)
            message.channel.send({ embeds: [updatingEmbed] })

            let query = `SELECT * FROM data WHERE teamnames = ?`
            db.get(query, [teamnames], (err, row) => 
            {
                if (err) {
                    console.log(err)
                    setTimeout(function() {
                    message.channel.send("Error!")} , 3000)
                    return
                }
                else //if (row === undefined) 
                {
                    let updatedata = db.prepare(`UPDATE data SET teamnames = ? WHERE teamnames = ?`)
                    updatedata.run(teamnames, teamcaptain)
                    updatedata.finalize()
                    db.close()
                
                    console.log(teamcaptain + " updated " + teamnames)
                    setTimeout(function() {
                    const doneEmbed = new EmbedBuilder()
                    .setColor(0x00FF00)
                    .setTitle(`${message.author.tag} <:white_check_mark:1030203856719720480>`)
                    .setDescription(`Successfully updated ${teamnames}.`)
                    message.channel.send({ embeds: [doneEmbed] }) } , 1500)
                    return
                } 
                /*else 
                {
                    setTimeout(function() {
                    //message.channel.send(teamnames + " has already been registered! Please choose a different team name.")
                    const alreadyEmbed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle(`${message.author.tag} <:no_entry:1030145886652727407> <:no_entry:1030145886652727407> <:no_entry:1030145886652727407>`)
                    .setDescription(`${teamnames} has already been registered! Please choose a different team name.`)
                    message.channel.send({ embeds: [alreadyEmbed] }) } , 1500)
                    return
                }*/
        /*db.run('UPDATE data SET word = ? WHERE teamnames = ?', [word, teamnames])
        console.log("done")
        db.each("SELECT id, name FROM Foo", function(err, row) {
            console.log(row.id + ": " + row.name)
          })*/
            }
        )}
    }
}