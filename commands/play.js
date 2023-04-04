const { randomRange } = require('../utils.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Reproduce audio'),
	async execute(message,client) {
        console.log('Ejecutando comando reproduce');  
        message.reply('En algún momento podré reproducir música, de momento te jodes y pagas Spotify');
	}
};


