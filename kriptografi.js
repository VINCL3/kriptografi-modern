function encrypt() {
    var plaintext = document.getElementById("plaintext").value;
    var key = document.getElementById("key").value;
    var ciphertext = caesarCipher(plaintext, key);
    document.getElementById("cipher-per-bits").value = ciphertext;

    if (!isValidBinaryString(plaintext) || !isValidBinaryString(key)) {
        alert("The PLAINTEXT and KEY mustn't EMPTY.");
        return;
    }

    var ciphertext = caesarCipher(plaintext, key);
    document.getElementById("cipher-per-bits").value = ciphertext;
    document.getElementById("ciphertext").value = ciphertext;
    document.getElementById("dec-key").value = key;
    document.getElementById("dec-plaintext").value = plaintext;

    document.getElementById("ciphertext-dec").value = convertToDecimal(ciphertext);
    document.getElementById("ciphertext-hex").value = convertToHexadecimal(ciphertext);
}

function caesarCipher(plaintext, key) {
    if (plaintext.length !== key.length) {
        throw new Error("Plaintext and key must have the same length.");
    }

    let ciphertext = '';
    for (let i = 0; i < plaintext.length; i++) {
        if (plaintext[i] !== key[i]) {
            ciphertext += '1';
        } else {
            ciphertext += '0';
        }
    }
    return ciphertext;
}

function isValidBinaryString(str) {
    return /^[01]+$/.test(str);
}

function convertToDecimal(str) {
    // Convert binary string to decimal and accumulate the values
    let totalDecimalValue = 0;
    for (let i = 0; i < str.length; i += 3) {
        let binaryChunk = str.substr(i, 3);
        totalDecimalValue += parseInt(binaryChunk, 2);
    }
    return totalDecimalValue.toString(); // Convert the total to a string for output
}

function convertToHexadecimal(str) {
    // Convert binary string to decimal and accumulate the values
    let totalHexadecimalValue = 0;
    for (let i = 0; i < str.length; i += 3) {
        let binaryChunk = str.substr(i, 3);
        totalHexadecimalValue += parseInt(binaryChunk, 2);
    }
    // Convert the total decimal value to hexadecimal
    return totalHexadecimalValue.toString(16).toUpperCase();
}

function decrypt() {
    var ciphertext = document.getElementById("ciphertext").value;
    var key = document.getElementById("dec-key").value;

    if (!isValidBinaryString(ciphertext) || !isValidBinaryString(key)) {
        alert("Ciphertext and key must be binary strings.");
        return;
    }

    var plaintext = caesarCipher(ciphertext, key);
    document.getElementById("dec-plaintext").value = plaintext;
}

function caesarCipher(ciphertext, key) {
    // Ensure ciphertext and key have the same length
    if (ciphertext.length !== key.length) {
        throw new Error("Ciphertext and key must have the same length.");
    }

    // Calculate the plaintext using the key
    let decplaintext = '';
    for (let i = 0; i < ciphertext.length; i++) {
        if (ciphertext[i] !== key[i]) {
            decplaintext += '1'; // If different, add '1' to plaintext
        } else {
            decplaintext += '0'; // If same, add '0' to plaintext
        }
    }
    return decplaintext;
}