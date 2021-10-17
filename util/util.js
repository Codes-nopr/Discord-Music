// Thanks to Sudhan for Progressbar helping, for at: https://github.com/SudhanPlayz/Discord-MusicBot/blob/master/util/ProgressBar.js
function createProgressBar(value, maxValue, size) {
    const percentage = value / maxValue; // Calculate the percentage of the bar
    const progress = Math.round(size * percentage); // Calculate the number of square caracters to fill the progress side.
    const emptyProgress = size - progress; // Calculate the number of dash caracters to fill the empty progress side.

    const progressText = "▇".repeat(progress); // Repeat is creating a string with progress * caracters in it
    const emptyProgressText = "—".repeat(emptyProgress); // Repeat is creating a string with empty progress * caracters in it
    const percentageText = Math.round(percentage * 100) + "%"; // Displaying the percentage of the bar

    const Bar = progressText + emptyProgressText; // Creating the bar
    return { Bar, percentageText };
}


function format(millis) {
    var h = Math.floor(millis / 3600000),
        m = Math.floor(millis / 60000),
        s = ((millis % 60000) / 1000).toFixed(0);
            
    if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
}

module.exports = { createProgressBar, format };