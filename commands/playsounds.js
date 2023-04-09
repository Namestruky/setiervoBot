const { randomRange } = require('../utils.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioPlayerStatus } = require('@discordjs/voice');
const play = require('./play.js');
const fs = require('fs');
const { exitCode } = require('process');


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
            const listado = [];
            const files = await fs.promises.readdir('sounds');
            files.forEach(element => listado.push(" "+element.substr(0,element.indexOf('.'))));


            if(parameter == 'listar'){
                message.reply("Lista de sonidos --> " + listado);
            }else{
                const player = createAudioPlayer();
            
                try {
                    const resource = createAudioResource(`sounds/${parameter}.mp3`);

                    player.on('error', (error) => {
                        message.reply("No existe ese audio mongolín.");
                    });

                    let encontrado = "";
                    try {
                        encontrado = listado.find(element => (element.toUpperCase().trim()) == (parameter[0].toUpperCase().trim()));
                    } catch (error) {
                        encontrado = "dontexist";
                    }
                   
                    console.log(encontrado);
                
                    if(encontrado == undefined || (parameter[0].toUpperCase().trim()) != encontrado.trim().toUpperCase()){
                        message.reply("No existe ese audio mongolín.");
                    } else{
                        player.play(resource);

                        const conexionCanal = joinVoiceChannel({
                            channelId: voiceChannelId,
                            guildId: guildId,
                            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                        });
            
                        const subscripcion = conexionCanal.subscribe(player);
            
                        //Cuando termina lo que este reproduciendo, se sale
                        player.on(AudioPlayerStatus.Idle, () => {
                            subscripcion.unsubscribe();
                            conexionCanal.disconnect();
                            message.reply("Sonido "+parameter+" reproducido correctemente.");
                        });
                    }
                } catch (error) {
                    console.log(error);
                } 
            }
            
        }
	}
};


