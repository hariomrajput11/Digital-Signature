const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.addEventListener('mousedown', () => {
    drawing = true;
    ctx.beginPath();
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
});

canvas.addEventListener('mousemove', draw);

function draw(event) {
    if (!drawing) return;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function copySignature() {
    canvas.toBlob(blob => {
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item]).then(() => {
            alert('Signature copied to clipboard');
        });
    });
}

function downloadSignature() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'signature.png';
    link.click();
}
// Pen color change ke liye
let penColor = '#000000'; // Default pen color

function changePenColor() {
    penColor = document.getElementById('penColorPicker').value;
}

function draw(event) {
    if (!drawing) return;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = penColor;

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

// Dark mode toggle aur color picker
function toggleDarkMode() {
    const container = document.querySelector('.container');
    container.classList.toggle('dark-mode');

    const darkModeText = document.getElementById('darkModeText');
    if (container.classList.contains('dark-mode')) {
        darkModeText.textContent = 'Dark Mode';
    } else {
        darkModeText.textContent = 'Light Mode';
    }
}
