const { randomRange } = require('../utils.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playSounds')
		.setDescription('Reproduce un sonido de la carpeta de sounds.'),
	async execute(message,client,parameter) {
		     
        if(message.member.voice){
            let voice = message.member.voice;
            let channelMembers = client.channels.cache.get(voice.channelId).members;
            let members = Array.from(channelMembers.keys());
            
            const player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                },
            });
            
        }
	}
};


