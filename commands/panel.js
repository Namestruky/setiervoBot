const { randomRange } = require('../utils.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioPlayerStatus } = require('@discordjs/voice');
const play = require('./play.js');
const fs = require('fs');
const { exitCode } = require('process');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('panel')
		.setDescription('Muestra el panel de sonidos'),
	async execute(message,client,parameter) {
        if(message.member.voice){
            const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Some title')
			.setURL('https://discord.js.org')
			.setDescription('Some description here');
        }
		let array = [
			'cosa' = 'cosa',
			'cosa2' = 123
		]
	}
};