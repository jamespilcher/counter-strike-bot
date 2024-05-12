const { SlashCommandBuilder } = require("discord.js");
const joinAndPlaySound = require("./helpers/joinAndPlaySound");
const getRandomFileFromFolder = require("./helpers/getRandomFileFromFolder");
const { exec } = require("child_process");

const {
    cs_death_folder,
    cs_cheer_folder,
    cs_explode_folder,
} = require("./helpers/soundFolderConstants");

let isCommandRunning = false;
const bust_words = [
    "Neughhh...",
    "Bust!",
    "Oh mama!",
    "Awghhh...",
    "Awoooga!",
    "Oh no!",
    "Oh yeah!",
    "Boioioing!",
    "Mmmmm...",
    "Nnnnmmm...",
    ":3",
    "Grrrrr...",
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bust")
        .setDescription("Bot will bust."),
    async execute(interaction) {
        if (isCommandRunning) {
            busyMessages = [
                "I'm busy getting nutted!",
                "Not now, I'm nutting!",
                "Can't you see I'm nutting?",
                "Can you wait a second? I'm nutting!",
                "Can you ask me later? I'm nutting!",
                "Just a moment, I'm nutting!",
            ];

            await interaction.reply(
                busyMessages[Math.floor(Math.random() * busyMessages.length)],
            );
            return;
        }
        await interaction.deferReply();
        isCommandRunning = true;

        const death_file = getRandomFileFromFolder(cs_death_folder);
        const output_file = `./bust_sound_${new Date().getTime()}.mp3`;

        var pre_death_file = "";
        if (Math.random() < 0.5) {
            pre_death_file = getRandomFileFromFolder(cs_cheer_folder);
        } else {
            pre_death_file = getRandomFileFromFolder(cs_explode_folder);
        }

        command = `ffmpeg -i "${pre_death_file}" -i "${death_file}" -filter_complex "[1:a]adelay=500|500[delayed];[0:a][delayed]concat=n=2:v=0:a=1[outa]" -map "[outa]" "${output_file}"`; // Mix the audio files into one

        await new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    reject(error);
                    return;
                }
                resolve(stdout);
            });
        });

        await joinAndPlaySound(interaction, output_file);

        exec(`rm ${output_file}`);

        await interaction.editReply(
            bust_words[Math.floor(Math.random() * bust_words.length)],
        );
        isCommandRunning = false;
    },
};
