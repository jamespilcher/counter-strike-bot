const { exec } = require('child_process');
const { SlashCommandBuilder } = require('discord.js');

const { getVoiceConnection } = require('@discordjs/voice');

const joinAndPlaySound = require('./helper_functions/joinAndPlaySound');
const getAttackNameFromFile = require('./helper_functions/getAttackNameFromFile');
const getKillWord = require('./helper_functions/getKillWord');
const getRandomFileFromFolder = require('./helper_functions/getRandomFileFromFolder');

let isCommandRunning = false;
const busyMessages = [ 
	"I'm busy getting killed!",
	"Not now, I'm getting killed!",
	"Can't you see I'm getting killed?",
	"Can you wait a second? I'm getting killed!",
	"Can you ask me later? I'm getting killed!",
	"Just a moment, I'm getting killed!"
]

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kill')
		.setDescription("Kill the bot."),
		async execute(interaction) {
            if (isCommandRunning) {
                await interaction.reply(busyMessages[Math.floor(Math.random() * busyMessages.length)]);
                return;
            }
			await interaction.deferReply();
			isCommandRunning = true;
			const cs_kill_folder = "./cs-kill";
			const cs_attack_gun_folder = `${cs_kill_folder}/cs-attack-gun`;
			const cs_death_folder = `${cs_kill_folder}/cs-death`;
			const cs_attack_other_folder = `${cs_kill_folder}/cs-attack-other`;
			const cs_dink_folder = `${cs_kill_folder}/cs-dink`
			const cs_help_folder = `${cs_kill_folder}/cs-help`

			const help_file = getRandomFileFromFolder(cs_help_folder);
			const death_file = getRandomFileFromFolder(cs_death_folder);
			var command = ""
			var weapon_name = ""
			const output_file = './mixed_sound.mp3';
			if (Math.random() < 0.5) {
				const gun_attack_file = getRandomFileFromFolder(cs_attack_gun_folder);
				weapon_name = getAttackNameFromFile(gun_attack_file)
				const dink_file = getRandomFileFromFolder(cs_dink_folder);
				command = `ffmpeg -i "${help_file}" -i "${gun_attack_file}" -i "${dink_file}" -i "${death_file}" -filter_complex "[1:a]adelay=200|200[delayed_gun_attack]; [3:a]adelay=200|200[delayed_death]; [0:a][delayed_gun_attack][2:a][delayed_death]concat=n=4:v=0:a=1[outa]" -map "[outa]" "${output_file}"`
			} else {
				const other_attack_file = getRandomFileFromFolder(cs_attack_other_folder);
				weapon_name = getAttackNameFromFile(other_attack_file)
				command = `ffmpeg -i "${help_file}" -i "${other_attack_file}" -i "${death_file}" -filter_complex "[1:a]adelay=200|200[delayed_gun_attack]; [2:a]adelay=200|200[delayed_death]; [0:a][delayed_gun_attack][delayed_death]concat=n=3:v=0:a=1[outa]" -map "[outa]" "${output_file}"			`

			}


            // Mix the audio files into one
			exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }

                // Play the mixed sound
            });
			await joinAndPlaySound(interaction, output_file);
			// delete output file
			exec('rm ./mixed_sound.mp3')

			// Bot was (getKillWord()) by (weapon_name)
			await interaction.editReply(`Got ${getKillWord()} by ${weapon_name}.`);

			// disconnect bot
			const connection = getVoiceConnection(interaction.guild.id); 
			connection.destroy();
			isCommandRunning = false;
		},
	};