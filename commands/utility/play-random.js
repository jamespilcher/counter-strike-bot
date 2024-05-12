const { SlashCommandBuilder } = require("discord.js");
const joinAndPlaySound = require("./helper_functions/joinAndPlaySound");
const getRandomFileFromFolder = require("./helper_functions/getRandomFileFromFolder");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play-random")
    .setDescription("Plays a funny Counter-Strike sound."),
  async execute(interaction) {
    await interaction.deferReply();

    const sound_file = getRandomFileFromFolder("./cs-funny-sounds");

    await joinAndPlaySound(interaction, sound_file);
    await interaction.editReply(`Random sound!`);
  },
};
