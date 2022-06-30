const readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function search(string, substring) {
    let n = string.length;
    let m = substring.length;
    let badChar = Array(256).fill(-1);
    let matches = 0;

    for (let i = 0; i < m; ++i) {
        badChar[substring.charCodeAt(i)] = i;
    }

    let j = m - 1;
    let s = 0;
    while (s <= (n - m)) {
        while (j >= 0 && substring.charAt(j) === string.charAt(s + j)) {
            j--;
        }

        if (j < 0) {
            matches++;
            if (s + m < n) {
                s += m - badChar[string.charCodeAt(s + m)];
            } else {
                s += 1;
            }
        } else {
            s += Math.max(1, j - badChar[string.charCodeAt(s + j)]);
        }
        j = m - 1;
    }
    return matches;
}

function main(string) {
    let minLen = 2;
    let maxLen = Math.floor(string.length / 2);
    for (let currentLen = maxLen; currentLen >= minLen; currentLen--) {
        for (let i = 0; i < string.length; i++) {
            let substring = string.slice(i, i + currentLen);
            if (substring.length === currentLen && search(string, substring) > 1) {
                return substring;
            }
        }
    }
}

rl.question("Input: ", (string) => {
    let result = main(string);
    console.log(result);
    rl.close();
});