const { randomRange } = require('../utils.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioPlayerStatus } = require('@discordjs/voice');
const play = require('./play.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playsound')
		.setDescription('Reproduce un sonido de la carpeta de sounds.'),
	async execute(message,client,parameter) {
		     
        if(message.member.voice){
            
            const voice = message.member.voice;
            const voiceChannelId = voice.channelId;
            const voiceChannel = client.channels.cache.get(voice.channelId);
            const guildId= '196260070261129216';
            
            const player = createAudioPlayer();
            

            player.on(AudioPlayerStatus.Playing, () => {
                console.log("El audio funciona genial")
            });

            player.on('error', (error) => {
                console.log("El audio funciona como una puta mierda")
            });

            const resource = createAudioResource("sounds/cancion.mp3");

            player.play(resource);

            const conexionCanal = joinVoiceChannel({
                channelId: voiceChannelId,
                guildId: guildId,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });

            const subscripcion = conexionCanal.subscribe(player);

            if(subscripcion){
                setTimeout(() =>{
                    subscripcion.unsubscribe();
                    conexionCanal.disconnect();
                }, 3000);
            }

        }
	}
};


