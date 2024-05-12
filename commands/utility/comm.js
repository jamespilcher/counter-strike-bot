
const { SlashCommandBuilder } = require('discord.js');
const joinAndPlaySound = require('./helper_functions/joinAndPlaySound');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('comm')
		.setDescription("Play an OG Counter-Strike voice command. See XXX for more details.")
		.addStringOption(option =>
			option.setName('voice-line')
				.setDescription('The voice command to say')
				.setRequired(true)
				.addChoices(
					{ name: 'Sector Clear!', value: 'sector-clear' },
					{ name: 'Meme', value: 'gif_meme' },
					{ name: 'Movie', value: 'gif_movie' },
				)),
				
		async execute(interaction) {
			await interaction.deferReply();
			const voice_line = interaction.options.getString('voice-line');
			const voice_file = `./cs-voice-comms/${voice_line}.mp3`;
			await joinAndPlaySound(interaction, voice_file);
			await interaction.editReply(`Sector Clear!`);
		},
	};