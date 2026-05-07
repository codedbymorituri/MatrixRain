console.log("Matrix Rain RUNNING...");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let settings;
let effect;
let intervalId;

 function startRain(rainSettings) {
    settings = rainSettings;
    clearInterval(intervalId);
    intervalId = setInterval(animate, 60);
    document.documentElement.requestFullscreen();
    setTimeout(function () {
        document.addEventListener("mousemove", showSettings);
        document.addEventListener("keydown", showSettings);
    }, 500);
 }

function animate() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = settings.fontSize + "px monospace";
    ctx.textAlign = "center";
    effect.symbols.forEach(symbol => symbol.draw(ctx));
}

function showSettings() {
    clearInterval(intervalId);
    document.removeEventListener("mousemove", showSettings);
    document.removeEventListener("keydown", showSettings);
    document.exitFullscreen();
    document.querySelector(".overlay").style.display = "flex";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener("fullscreenchange", function () {
    if (document.fullscreenElement) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        effect = new Effect(canvas.width, canvas.height, settings.fontSize, settings.fallSpeed, settings.trailLength);
    } else {
        showSettings();
    }
});

