export function capitaliseWords(word) {
    if (word === "" || !word) return word;
    const words = word.split(' ');
    return words.map((cur) => cur[0].toUpperCase() + cur.substring(1)).join(' ');
}