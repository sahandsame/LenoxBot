/**
 * TODO:
 * - Add throttling (cooldown)
 */

const Discord = require('discord.js');
const moment = require('moment');
const LenoxCommand = require('../LenoxCommand.js');
require('moment-duration-format');

module.exports = class BotInfoCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'botinfo',
			group: 'utility',
			memberName: 'botinfo',
			description: 'Information about the bot',
			guarded: true,
			aliases: ['binfo', 'bi'],
			examples: ['botinfo'],
			clientPermissions: ['SEND_MESSAGES', 'ADMINISTRATOR']
		});
	}

	run(msg) {
		const provider = msg.client.provider;

		const langSet = provider.get(msg.message.guild.id, 'language', 'en-US');
		const lang = require(`../../languages/${langSet}.json`);
		moment.locale(langSet);

		const uptimeserver = moment.duration(msg.client.uptime).format(`d[ ${lang.messageevent_days}], h[ ${lang.messageevent_hours}], m[ ${lang.messageevent_minutes}] s[ ${lang.messageevent_seconds}]`);
		const version = require('../../package.json').version;

		const online = lang.botinfo_online.replace('%guilds', msg.client.guilds.size).replace('%users', msg.client.users.size);
		const embed = new Discord.RichEmbed()
			.setAuthor('LenoxBot', msg.client.user.avatarURL)
			.setColor('#0066CC')
			.setThumbnail(msg.client.user.avatarURL)
			.addField(`⏳ ${lang.botinfo_runtime}`, `${uptimeserver}`)
			.addField(`📡 ${lang.botinfo_stats}`, online)
			.addField(`💻 ${lang.botinfo_website}`, `http://www.lenoxbot.com/`)
			.addField(`💎 ${lang.botinfo_support}`, `https://lenoxbot.com/donate`)
			.addField(`📤 ${lang.botinfo_invite}`, `https://lenoxbot.com/invite/`)
			.addField(`📢 ${lang.botinfo_supportserver}`, 'https://lenoxbot.com/discord/')
			.addField(`🔛 ${lang.botinfo_version}`, version);

		msg.message.channel.send({
			embed
		});
	}
};
