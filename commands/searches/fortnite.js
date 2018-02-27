exports.run = async(client, msg, args, lang) => {
	const Discord = require('discord.js');
	const Fortnite = require('fortnite');
	const fortniteclient = new Fortnite('f00bb1ee-0be8-4474-bbf4-58a382e3245d');

	const input = args.slice();

	if (!input[0]) return msg.channel.send(lang.fortnite_noinput);

	var stats = await fortniteclient.getInfo(input[0], !input[1] ? 'PC' : input[1]);

		const embed = new Discord.RichEmbed()
		.setURL(stats.url)
		.setColor('#f45942')
		.setAuthor(`${stats.username} || ${stats.platformNameLong}`);
		for (var i = 0; i < stats.lifetimeStats.length; i++) {
            var stat = stats.lifetimeStats[i].stat;
            var value = stats.lifetimeStats[i].value;
            embed.addField(stat, value, true);
        }
		return msg.channel.send({ embed });
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	userpermissions: []
};
exports.help = {
	name: 'fortnite',
	description: 'Shows you Fortnite stats about a player on every console',
	usage: 'fortnite {EpicGames Username} [PC, XBOX, PSN (pc default)]',
	example: ['fortnite Monkeyyy11ez PSN'],
	category: 'searches',
	botpermissions: ['SEND_MESSAGES']
};