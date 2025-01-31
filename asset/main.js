document.getElementById("dropZone").addEventListener("click", function() {
  document.getElementById("fileInput").click();
});

document.getElementById("fileInput").addEventListener("change", function(event) {
  let file = event.target.files[0];
  if (file) {
    document.getElementById("fileName").textContent = "File: " + file.name;
  }
});

document.getElementById("dropZone").addEventListener("dragover", function(event) {
  event.preventDefault();
  this.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
});

document.getElementById("dropZone").addEventListener("dragleave", function() {
  this.style.backgroundColor = "transparent";
});

document.getElementById("dropZone").addEventListener("drop", function(event) {
  event.preventDefault();
  this.style.backgroundColor = "transparent";

  let file = event.dataTransfer.files[0];
  if (file) {
    document.getElementById("fileInput").files = event.dataTransfer.files;
    document.getElementById("fileName").textContent = "File: " + file.name;
  }
});

function handleFileUpload() {
    const fileInput = document.getElementById("fileInput");
    const inputCode = document.getElementById("inputCode");

    if (fileInput.files.length === 0) {
        alert("Pilih file terlebih dahulu!");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        inputCode.value = event.target.result;
    };

    reader.readAsText(file);
}

function encodeJSObfuscator() {
    let inputCode = document.getElementById("inputCode").value;
    
    if (!inputCode) {
        alert("Masukkan kode JavaScript dulu!");
        return;
    }

    let obfuscator = JavaScriptObfuscator.obfuscate(inputCode, {
        compact: true,
        controlFlowFlattening: true,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true
    });

    document.getElementById("outputCode").value = obfuscator.getObfuscatedCode();
}

function encodeBase64() {
    const inputCode = document.getElementById("inputCode").value;
    if (!inputCode) {
        alert("Masukkan kode dulu!");
        return;
    }
    document.getElementById("outputCode").value = btoa(inputCode);
}

function encodeBase32() {
    const inputCode = document.getElementById("inputCode").value;
    if (!inputCode) {
        alert("Masukkan kode dulu!");
        return;
    }
    document.getElementById("outputCode").value = base32Encode(inputCode);
}

function base32Encode(input) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let bits = "", output = "";
    
    for (let i = 0; i < input.length; i++) {
        bits += input[i].charCodeAt(0).toString(2).padStart(8, '0');
    }
    
    while (bits.length % 5 !== 0) {
        bits += "0";
    }
    
    for (let i = 0; i < bits.length; i += 5) {
        output += alphabet[parseInt(bits.substr(i, 5), 2)];
    }

    return output;
}

function copyToClipboard() {
    const outputCode = document.getElementById("outputCode");
    outputCode.select();
    document.execCommand("copy");
    alert("Kode berhasil disalin!");
}

function downloadObfuscated() {
    const outputCode = document.getElementById("outputCode").value;
    if (!outputCode) {
        alert("Tidak ada kode untuk di-download!");
        return;
    }

    const blob = new Blob([outputCode], { type: "text/javascript" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "obfuscated-kenz.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}