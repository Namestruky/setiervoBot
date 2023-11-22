const { randomRange } = require('../../utils.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
        .setName('ruleta')
        .setDescription('Manda al AFK a alguin aleatorio');

module.exports = {
    data,
    async execute(interaction) {
        console.log('Ejecutando comando ruleta');
        const client = interaction.client;
        const guild = client.guilds.cache.get(interaction.guildId);
        const member = guild.members.cache.get(interaction.member.user.id);
        const voiceChannel = member.voice.channel;
        if(voiceChannel){
            
            //console.log('Voice',voice.channelId);
            let channelMembers = client.channels.cache.get(voiceChannel.id).members;
            //console.log(Array.from(channelMembers.keys()).toString());
            let members = Array.from(channelMembers.values());
            
            userToKick =  channelMembers.random();
            
            /*
            userToKick.kick('Has sido víctima de la ruleta rusa').then(() => {
                sendMessage('Se ha kickeado a ' + userToKick.displayName);
            })
            */
            
            userToKick.voice.setChannel('689959836007399445').then(() => {
                interaction.reply('Se ha movido a ' + userToKick.displayName + ' para que piense un rato');
            });
        }
	}
};


