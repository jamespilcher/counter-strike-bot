function getKillWord() {
    killWords = [
        "killed",
        "rekt",
        "pwned",
        "destroyed",
        "cooked",
        "annihilated",
        "obliterated",
        "merked",
        "memed",
    ];
    return killWords[Math.floor(Math.random() * killWords.length)];
}
module.exports = getKillWord;
