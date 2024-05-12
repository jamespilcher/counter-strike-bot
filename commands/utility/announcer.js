const { SlashCommandBuilder } = require("discord.js");
const joinAndPlaySound = require("./helpers/joinAndPlaySound");
const { cs_game_announcer_folder } = require("./helpers/soundFolderConstants");

const voiceLineNames = {
    bombdef: "Bomb has been defused.",
    bombpl: "Bomb has been planted.",
    ctwin: "Counter Terrorists win!",
    terwin: "Terrorists win!",
    rounddraw: "Round draw!",
    hosdown: "Hostage down.",
    rescued: "Hostage has been rescued.",
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName("announcer")
        .setDescription("Play an announcer line from Counter-Strike.")
        .addStringOption((option) =>
            option
                .setName("voice-line")
                .setDescription("The voice line to announce")
                .setRequired(true)
                .addChoices(
                    { name: "Bomb has been defused.", value: "bombdef" },
                    { name: "Bomb has been planted.", value: "bombpl" },
                    { name: "Counter Terrorists win!", value: "ctwin" },
                    { name: "Terrorists win!", value: "terwin" },
                    { name: "Round draw!", value: "rounddraw" },
                    { name: "Hostage down.", value: "hosdown" },
                    { name: "Hostage has been rescued.", value: "rescued" },
                ),
        ),

    async execute(interaction) {
        await interaction.deferReply();
        const voice_line = interaction.options.getString("voice-line");
        const voice_file = `${cs_game_announcer_folder}/${voice_line}.mp3`;
        await joinAndPlaySound(interaction, voice_file);
        await interaction.editReply(voiceLineNames[voice_line]);
    },
};
