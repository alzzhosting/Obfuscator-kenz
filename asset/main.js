let obfuscatedCode = '';

// Fungsi untuk obfuscate kode langsung dari textarea
function obfuscateCode() {
    const inputCode = document.getElementById('inputCode').value;

    if (inputCode.trim() === '') {
        alert("Tolong masukkan kode JavaScript!");
        return;
    }

    obfuscatedCode = JavaScriptObfuscator.obfuscate(inputCode, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 1,
        debugProtection: true,
        debugProtectionInterval: 1000,
        disableConsoleOutput: true,
        selfDefending: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        splitStrings: true,
        splitStringsChunkLength: 5,
        transformObjectKeys: true,
        unicodeEscapeSequence: true
    }).getObfuscatedCode();

    document.getElementById('output').textContent = obfuscatedCode;
    document.getElementById('downloadButton').style.display = 'inline-block';
}

// Fungsi untuk obfuscate file yang diunggah
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert("Pilih file JavaScript yang mau di-obfuscate!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const fileContent = event.target.result;

        obfuscatedCode = JavaScriptObfuscator.obfuscate(fileContent, {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1,
            debugProtection: true,
            debugProtectionInterval: 1000,
            disableConsoleOutput: true,
            selfDefending: true,
            stringArray: true,
            stringArrayEncoding: ['base64'],
            stringArrayIndexShift: true,
            stringArrayRotate: true,
            stringArrayShuffle: true,
            splitStrings: true,
            splitStringsChunkLength: 5,
            transformObjectKeys: true,
            unicodeEscapeSequence: true
        }).getObfuscatedCode();

        document.getElementById('output').textContent = obfuscatedCode;
        document.getElementById('downloadButton').style.display = 'inline-block';
    };

    reader.readAsText(file);
}

// Fungsi untuk mengunduh file hasil obfuscate
function downloadFile() {
    const blob = new Blob([obfuscatedCode], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'obfuscated-kenzdev.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}