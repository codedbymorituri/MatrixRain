class Symbol {
    static MIN_SPEED = 0.3;
    static SPEED_RANGE = 1.2;
    static MAX_COLUMN_SPAWN_DELAY = 50;  //Max rows above the canvas that the column header can spawn at

    constructor(x, canvasHeight, fontSize, fallSpeed, trailLength) {
        this.characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";
        this.x = x;
        this.canvasHeight = canvasHeight;
        this.fontSize = fontSize;
        this.baseFallSpeed = fallSpeed;
        this.fallSpeed = (Symbol.MIN_SPEED + Math.random() * Symbol.SPEED_RANGE) * this.baseFallSpeed;
        this.trailLength = trailLength;
        this.drop = Math.random() * -50;
        this.prevRow = Math.floor(this.drop);
        this.trail = [];
    }

    #randChar() {
        return this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    }

    draw(context) {
        const headRow = Math.floor(this.drop);

        for (let r = this.prevRow + 1; r <= headRow; r++) {
            this.trail.unshift({ row: r, ch: this.#randChar() });
        }

        if (this.trail.length > this.trailLength) {
            this.trail.length = this.trailLength;
        }

        for (let t = 0; t < this.trail.length; t++) {
            const cell = this.trail[t];
            const yPixelPosition = cell.row * this.fontSize;
            const trailBrightness = Math.round(255 * (1 - t / this.trailLength));
            const headerColour = Math.round(180 * Math.max(0, 1 - t / 3));
            context.fillStyle = `rgb(${headerColour},${trailBrightness},${headerColour})`;
            context.fillText(cell.ch, this.x * this.fontSize + this.fontSize / 2, yPixelPosition);
        }

        if (this.drop * this.fontSize > this.canvasHeight) {
            this.drop = Math.random() * -Symbol.MAX_COLUMN_SPAWN_DELAY;
            this.fallSpeed = (Symbol.MIN_SPEED + Math.random() * Symbol.SPEED_RANGE) * this.baseFallSpeed;
            this.trail = [];
            this.prevRow = Math.floor(this.drop);
        } else {
            this.prevRow = headRow;
            this.drop += this.fallSpeed;
        }
    }
}
