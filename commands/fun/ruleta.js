const { randomRange } = require('../../utils.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ruleta')
		.setDescription('Manda al AFK a alguin aleatorio'),
	async execute(message,client) {
        console.log('Ejecutando comando ping');
		     
        if(message.member.voice){
            let voice = message.member.voice;
            //console.log('Voice',voice.channelId);
            let channelMembers = client.channels.cache.get(voice.channelId).members;
            //console.log(Array.from(channelMembers.keys()).toString());
            let members = Array.from(channelMembers.keys());
    
            userToKick =  message.guild.members.cache.get(members[randomRange(0,members.length)]);
    
            /*
            userToKick.kick('Has sido víctima de la ruleta rusa').then(() => {
                sendMessage('Se ha kickeado a ' + userToKick.displayName);
            })
            */
            userToKick.voice.setChannel('689959836007399445').then(() => {
                message.reply('Se ha movido a ' + userToKick.displayName);
            });
        }
	}
};


