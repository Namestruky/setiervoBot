const { randomRange, sendMessage } = require('./utils.js');
const {Client,Collection, GatewayIntentBits} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// Gestión comandos

client.commands = new Collection();

const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Declaración constantes

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
                            'Como no se que me pides te cuento un chiste, "Hola, ¿tienen libros para el cansancio? - Sí, pero están agotados."',
                            '¡Increíble! Realmente estás dando lo mejor de ti, sigue intentando que te entiendan',
                            'Estaría de acuerdo contigo, pero luego ambos estaríamos equivocados, por que no te entiendo',
                            'No te entiendo, así que tu puta madre por si acaso.',
                            'No existen las preguntas tontas, solo las personas tontas. ¿O era al contrario?'
                        ];

// Flujo Principal

client.login(CONFIG.token);
 

client.once('ready', () => {
    
    client.user.setActivity('Arruinarte la vida');

    //client.channels.cache.get(CHANNEL_ID).send('Estoy conectado y listo');
    //sendMessage('Mensaje de prueba');
    
    console.log('Bot conectado y listo');
});

client.on('messageCreate', async (message) => { 

    if(!message.content.startsWith(CONFIG.prefix)) return;

    var command = message.content.split(' ')[0].substring(1);
    var parameter = message.content.split(' ').slice(1);

    console.log("Comando Solicitado: " + command, "Parámetros: " + parameter);

    if(!client.commands.has(command)) {
        console.log('Error ejecutando '.command);
        message.reply({content: DEFAULT_MESSAGES[randomRange(0,DEFAULT_MESSAGES.length)],ephemeral: true});
        return; 
    } 
    
    try {
        await client.commands.get(command).execute(message,client,parameter);
    } catch (error) {
        console.error(error);
    }
});

