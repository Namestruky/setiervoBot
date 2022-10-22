const Discord = require('discord.js');
const client = new Discord.Client({
    intents: ['DirectMessages' ,'DirectMessageReactions', 'Guilds', 'GuildBans', 'GuildEmojisAndStickers', 'GuildMessages', 'MessageContent', 'GuildMessageReactions','GuildVoiceStates','GuildMembers']
});

const PREFIX = '';
const CONFIG = require('./config.json');
const CHANNEL_ID = '1033136862048555098'; // ID Canal setiervobot
const DEFAULT_MESSAGES = [
                            'No entiendo una puta mierda de lo que me quieres decir, ESTUDIA!!!',
                            'Lo siento, no entiendo mongolo',
                            'Si no te entiende ni tu madre como te voy a entender yo',
                            'No te entiendo, sácate la polla de la boca',
                            'Pinche mierda, ¡aprende a escribir!',
                            'I dont understand you piece of garbage',
                            'Bocachancla, ¿por qué escribes cosas que no entiendo?',
                            'Te voy a dar un manual para subnormales, para que te entiendas tu mismo.',
                            'Shut the fuck up!',
                            'Como no se que me pides te cuento un chiste, "Hola, ¿tienen libros para el cansancio? - Sí, pero están agotados."'
                        ];

client.login(CONFIG.token);



client.on('ready', () => {
    
    client.user.setActivity('Arruinarte la vida');
    console.log('Bot conectado y listo');
    //client.channels.cache.get(CHANNEL_ID).send('Estoy conectado y listo');
    //sendMessage('Mensaje de prueba');
});

client.on('messageCreate', (message) => {

    //console.log(message);

    if (message.channelId != CHANNEL_ID || message.author.bot) return false;
    
    switch (message.content.split(' ')[0].toLowerCase()) {
        case 'reproducir':
            sendMessage('En algún momento podré reproducir música, de momento te jodes y pagas Spotify');
            break;

        case 'ruleta':
            ruletaRusa(message);
            break;

        default:
            sendMessage(DEFAULT_MESSAGES[randomRange(0,DEFAULT_MESSAGES.length)]);
            break;
    }

});

/**
 * Envía un mensaje texto plano al canal definido en {{CHANNEL_ID}}
 * @param {string} messageBody Texto del mensaje
 */
function sendMessage(messageBody) {
    client.channels.cache.get(CHANNEL_ID).send(messageBody).then(() => {
        console.log('Mensaje enviado', messageBody);
    });
}

/**
 * 
 */
function ruletaRusa(message) {
            
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
            sendMessage('Se ha movido a ' + userToKick.displayName);
        });
    }
}


/**
 * Número aleatorio entre min y max (max no incluido)
 * @param {Number} min Mínimo
 * @param {Number} max Máximo
 * @returns number
 */
function randomRange(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }