const { SlashCommandBuilder } = require("discord.js");
const joinAndPlaySound = require("./helpers/joinAndPlaySound");
const { cs_voice_comms_folder } = require("./helpers/soundFolderConstants");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("comm")
        .setDescription("Play an OG Counter-Strike voice command.")
        .addStringOption((option) =>
            option
                .setName("voice-line")
                .setDescription("The voice command to say")
                .setRequired(true)
                .addChoices(
                    { name: "Sector Clear!", value: "sector-clear" },
                    { name: "Fire in the Hole!", value: "fire-in-the-hole" },
                    {
                        name: "Get Out of There, It's Gonna Blow!",
                        value: "get-out-of-there-its-gonna-blow",
                    },
                    { name: "Nice Shot!", value: "nice-shot" },
                ),
        ),

    async execute(interaction) {
        await interaction.deferReply();
        const voice_line = interaction.options.getString("voice-line");
        const voice_file = `${cs_voice_comms_folder}/${voice_line}.mp3`;
        await joinAndPlaySound(interaction, voice_file);
        await interaction.editReply(`Sector Clear!`);
    },
};
