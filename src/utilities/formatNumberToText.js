export function formatNumberToText(num) {
    if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(2).replace(/\.00$/, '') + ' billion';
    } else if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(2).replace(/\.00$/, '') + ' million';
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(2).replace(/\.00$/, '') + 'K';
    } else {
        return num.toString();
    }
}