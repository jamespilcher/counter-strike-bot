const { SlashCommandBuilder } = require("discord.js");
const joinAndPlaySound = require("./helpers/joinAndPlaySound");
const { cs_voice_comms_folder } = require("./helpers/soundFolderConstants");
// make a map                     { name: "Sector Clear!", value: "clear" },

const voiceLineNames = {
    clear: "Sector Clear!",
    com_go: "Go Go Go!",
    sticktog: "Stick Together Team!",
    fireinhole: "Fire in the Hole!",
    enemydown: "Enemy Down!",
    stormfront: "Storm the Front!",
    fallback: "Fall Back!",
    com_getinpos: "Get in Position!",
    blow: "Get out of there, it's gonna blow!",
    ct_coverme: "Cover Me!",
    ct_affirm: "Affirmative!",
    ct_reportingin: "Reporting in!",
    ct_enemys: "Enemy Spotted!",
    ct_inpos: "I'm in Position!",
    ct_backup: "Need Backup!",
    fireassis: "Taking fire, need assistance!",
    locknload: "Lock and Load!",
    moveout: "Move Out!",
    negative: "Negative!",
    position: "Position!",
    regroup: "Regroup Team!",
    roger: "Roger That!",
    takepoint: "Take Point!",
    followme: "Follow Me!",
};

//  blow.wav          com_reportin.wav  ct_enemys.wav       enemydown.wav  go.wav         negative.wav  sticktog.wav
// clear.wav         ct_affirm.wav     ct_fireinhole.wav   fallback.wav   letsgo.wav     position.wav  stormfront.wav
// com_getinpos.wav  ct_backup.wav     ct_inpos.wav        fireassis.wav  locknload.wav  regroup.wav   takepoint.wav
// com_go.wav        ct_coverme.wav    ct_reportingin.wav  followme.wav   moveout.wav    roger.wav

module.exports = {
    data: new SlashCommandBuilder()
        .setName("voice-comm")
        .setDescription("Play an OG Counter-Strike voice command.")
        .addStringOption((option) =>
            option
                .setName("voice-line")
                .setDescription("The voice command to say")
                .setRequired(true)
                .addChoices(
                    { name: "Sector Clear!", value: "clear" },
                    { name: "Go Go Go!", value: "com_go" },
                    { name: "Stick Together Team!", value: "sticktog" },
                    { name: "Fire in the Hole!", value: "fireinhole" },
                    { name: "Enemy Down!", value: "enemydown" },
                    { name: "Storm the Front!", value: "stormfront" },
                    { name: "Fall Back!", value: "fallback" },
                    { name: "Get in Position!", value: "com_getinpos" },
                    { name: "Get out of there, it's gonna blow!", value: "blow" },
                    { name: "Cover Me!", value: "ct_coverme" },
                    { name: "Affirmative!", value: "ct_affirm" },
                    { name: "Reporting in!", value: "ct_reportingin" },
                    { name: "Enemy Spotted!", value: "ct_enemys" },
                    { name: "I'm in Position!", value: "ct_inpos" },
                    { name: "Need Backup!", value: "ct_backup" },
                    { name: "Taking fire, need assistance!", value: "fireassis" },
                    { name: "Lock and Load!", value: "locknload" },
                    { name: "Move Out!", value: "moveout" },
                    { name: "Negative!", value: "negative" },
                    { name: "Hold this Position!", value: "position" },
                    { name: "Regroup Team!", value: "regroup" },
                    { name: "Roger That!", value: "roger" },
                    { name: "Take Point!", value: "takepoint" },
                    { name: "Follow Me!", value: "followme" },
                ),
        ),

    async execute(interaction) {
        const voice_line = interaction.options.getString("voice-line");
        const voice_file = `${cs_voice_comms_folder}/${voice_line}.mp3`;
        const voice_line_name = voiceLineNames[voice_line];
        await interaction.reply(voice_line_name);
        await joinAndPlaySound(interaction, voice_file);
    },
};
