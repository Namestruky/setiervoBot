const { randomRange } = require('../../utils.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioPlayerStatus } = require('@discordjs/voice');
const play = require('./play.js');
const path = require('path');
const fs = require('fs');
const { exitCode } = require('process');

const sonidos = fs.readdirSync(__dirname+'/../../sounds',{withFileTypes: false});

const data = new SlashCommandBuilder()
    .setName('sonido')
    .setDescription('Replies with your input!')
    .addStringOption(option =>
        option.setName('nombre')
        .setDescription('Sonido que se va a reproducir')
        .setRequired(true));

sonidos.forEach((sonido) => {
    const nombreSonido = path.parse(sonido).name;
    data.options[0].addChoices({name: nombreSonido, value:nombreSonido});
})
    
module.exports = { 
    data,
	async execute(interaction) {
		     
        console.log(sonidos);
        console.log(interaction);
        const client = interaction.client;
        const guild = client.guilds.cache.get(interaction.guildId);
        const member = guild.members.cache.get(interaction.member.user.id);
        const voiceChannel = member.voice.channel;
        
        if(voiceChannel){

            const parameter = interaction.options.getString('nombre')
            const voiceChannelId = voiceChannel.id;
            const guildId= '196260070261129216';
            const listado = [];

            if(parameter == 'listar'){
                interaction.channel.send("Lista de sonidos --> " + listado);
            }else{
                const player = createAudioPlayer();
            
                try {
                    const resource = createAudioResource(`sounds/${parameter}.mp3`);

                    player.on('error', (error) => {
                        interaction.channel.send("No existe ese audio mongolín.");
                        console.log(error);
                    });
                

                        player.play(resource);

                        const conexionCanal = joinVoiceChannel({
                            channelId: voiceChannelId,
                            guildId: guildId,
                            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                        });
            
                        const subscripcion = conexionCanal.subscribe(player);
            
                        //Cuando termina lo que este reproduciendo, se sale
                        player.on(AudioPlayerStatus.Idle, () => {
                            setTimeout(() => desconectar(subscripcion,conexionCanal),1800000);
                        });
                    
                } catch (error) {
                    console.log(error);
                } 
            }

            function desconectar(subscripcion, conexionCanal){
                subscripcion.unsubscribe();
                conexionCanal.disconnect();
                interaction.channel.send({content: "Sonido "+parameter+" reproducido correctemente.", ephemeral: true});

            }
        }
	}
};


