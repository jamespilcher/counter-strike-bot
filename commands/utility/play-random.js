const { SlashCommandBuilder } = require("discord.js");
const joinAndPlaySound = require("./helpers/joinAndPlaySound");
const getRandomFileFromFolder = require("./helpers/getRandomFileFromFolder");
const { cs_funny_folder } = require("./helpers/soundFolderConstants");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play-random")
        .setDescription("Plays a funny Counter-Strike sound."),
    async execute(interaction) {
        await interaction.deferReply();

        const sound_file = getRandomFileFromFolder(cs_funny_folder);

        await joinAndPlaySound(interaction, sound_file);
        await interaction.editReply(`Random sound!`);
    },
};
