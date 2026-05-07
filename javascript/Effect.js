class Effect {
    constructor(canvasWidth, canvasHeight, fontSize, fallSpeed, trailLength) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = fontSize;
        this.fallSpeed = fallSpeed;
        this.trailLength = trailLength;
        this.columns = Math.floor(this.canvasWidth / this.fontSize);
        this.symbols = [];
        this.#initialize();
    }

    #initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, this.canvasHeight, this.fontSize, this.fallSpeed, this.trailLength);
        }
    }
}
