
const weaponMap = new Map([
    ['ak47-1.mp3', 'AK-47'],
    ['awp1.mp3', 'AWP'],
    ['deagle-1.mp3', 'Desert Eagle'],
    ['m4a1-1.mp3', 'M4A1-S'],
    ['usp1.mp3', 'USP-S'],
    ['glock18-1.mp3', 'Glock-18'],
    ['c4_expload1.mp3', 'C4'],
    ['knife_stab.mp3', 'Knife'],
    ['expload_3.mp3', 'HE Grenade'],
    ['taser_shoot.mp3', 'Zeus x27']
]); 

function getAttackNameFromFile(filePath) {
    // take the file name from the path
    const fileName = filePath.split("/").pop();

    if (!weaponMap.has(fileName)) {
        console.log('Unknown weapon: ' + fileName);
        return fileName;
    }

    return weaponMap.get(fileName);
}
module.exports = getAttackNameFromFile;