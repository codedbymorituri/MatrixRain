const fontSizeValue = document.getElementById("font-size-value");
const fallSpeedValue = document.getElementById("fall-speed-value");
const trailLengthValue = document.getElementById("trail-length-value");

const fontSizeSlider = document.getElementById("font-size-slider");
const fallSpeedSlider = document.getElementById("fall-speed-slider");
const trailLengthSlider = document.getElementById("trail-length-slider");

fontSizeSlider.addEventListener("input", function () {
    fontSizeValue.textContent = this.value + "px";
});

fallSpeedSlider.addEventListener("input", function () {
     fallSpeedValue.textContent = this.value;
});

trailLengthSlider.addEventListener("input", function () {
    trailLengthValue.textContent = this.value;
});

document.getElementById("start-button").addEventListener("click", function () {
    rainSettings = {
        fontSize: parseInt(fontSizeSlider.value),
        fallSpeed: parseInt(fallSpeedSlider.value) / 10,
        trailLength: parseInt(trailLengthSlider.value)
    };
    document.querySelector(".overlay").style.display = "none";
    startRain(rainSettings);
});