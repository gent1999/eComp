const sqlite = require("sqlite3").verbose()
const { EmbedBuilder } = require('discord.js');

module.exports = 
{
    name: 'teams',
    description: 'Displays teams',
    execute(client, message, args, Discord)
    {
        if (message.author.bot) return
        //let db = new sqlite.Database('./NameOfTeams.db', sqlite.OPEN_READWRITE)

        message.channel.send('Displaying Teams')
        let db = new sqlite.Database('./NameOfTeams.db')

        let sql = `SELECT DISTINCT teamnames, teamcaptain FROM data
                   ORDER BY teamcaptain`

        db.all(sql, [], (err, rows) => 
        {
            if (err) 
            {
                throw err;
            }
            rows.forEach((row) => 
            {
                const exampleEmbed = new EmbedBuilder()
	            .setColor(0x0099FF)
	            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                .setTitle(`${row.teamnames}`)
	            .addFields
                (
		            { name: `__Team Captain__`, value: `${row.teamcaptain}` },
                    { name: `__Roster__`, value: `${row.teamcaptain}` },
	            )
                message.channel.send({ embeds: [exampleEmbed] });
                //message.channel.send(row.teamnames)
            })
        })
        db.close();
    }
}