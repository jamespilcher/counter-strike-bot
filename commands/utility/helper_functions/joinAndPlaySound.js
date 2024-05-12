const {
  getVoiceConnection,
  entersState,
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
} = require("@discordjs/voice");

async function joinAndPlaySound(interaction, sound_file) {
  const voiceChannelId = interaction.member.voice.channel.id;
  const guildId = interaction.guild.id;
  const adapterCreator = interaction.guild.voiceAdapterCreator;

  let connection = getVoiceConnection(guildId);

  if (connection && connection.joinConfig.channelId !== voiceChannelId) {
    await connection.destroy();
    connection = null;
  }

  if (!connection) {
    connection = joinVoiceChannel({
      channelId: voiceChannelId,
      guildId: guildId,
      adapterCreator: adapterCreator,
      selfDeaf: false,
    });
  }

  if (connection.state.status !== VoiceConnectionStatus.Ready) {
    console.log(`Waiting for connection to become ready...`);
    await entersState(connection, VoiceConnectionStatus.Ready, 5000); // 5 second timeout
  }
  const audioplayer = createAudioPlayer();
  connection.subscribe(audioplayer);
  const resource = createAudioResource(sound_file);
  audioplayer.play(resource);

  // Wait for the audio player to become idle
  await new Promise((resolve) =>
    audioplayer.once(AudioPlayerStatus.Idle, resolve),
  );
}

module.exports = joinAndPlaySound;
