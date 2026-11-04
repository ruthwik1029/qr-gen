const urlInput = document.getElementById("urlInput");
const generateBtn = document.getElementById("generateBtn");
const errorMsg = document.getElementById("errorMsg");
const qrWrapper = document.getElementById("qrWrapper");
const qrcodeDiv = document.getElementById("qrcode");
const downloadBtn = document.getElementById("downloadBtn");

let qrInstance = null;

function generateQRCode() {
  const text = urlInput.value.trim();
  errorMsg.textContent = "";

  if (!text) {
    errorMsg.textContent = "Please enter a URL or some text first.";
    qrWrapper.classList.add("hidden");
    return;
  }

  // Clear any previously generated QR code
  qrcodeDiv.innerHTML = "";

  qrInstance = new QRCode(qrcodeDiv, {
    text: text,
    width: 220,
    height: 220,
    colorDark: "#1f2937",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  qrWrapper.classList.remove("hidden");
}

function downloadQRCode() {
  // The library renders either a <canvas> or an <img> depending on the browser
  const canvas = qrcodeDiv.querySelector("canvas");
  const img = qrcodeDiv.querySelector("img");

  let dataUrl;
  if (canvas) {
    dataUrl = canvas.toDataURL("image/png");
  } else if (img) {
    dataUrl = img.src;
  } else {
    return;
  }

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "qrcode.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

generateBtn.addEventListener("click", generateQRCode);
downloadBtn.addEventListener("click", downloadQRCode);

urlInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    generateQRCode();
  }
});
