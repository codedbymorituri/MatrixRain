class Symbol {
    static MIN_SPEED = 0.3;
    static SPEED_RANGE = 1.2;

    constructor(x, canvasHeight, fontSize, fallSpeed, trailLength) {
        this.characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";
        this.x = x;
        this.canvasHeight = canvasHeight;
        this.fontSize = fontSize;
        this.fallSpeed = (Symbol.MIN_SPEED + Math.random() * Symbol.SPEED_RANGE) * fallSpeed;
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
            const y = cell.row * this.fontSize;
            const g = Math.round(255 * (1 - t / this.trailLength));
            const rb = Math.round(180 * Math.max(0, 1 - t / 3));
            context.fillStyle = `rgb(${rb},${g},${rb})`;
            context.fillText(cell.ch, this.x * this.fontSize + this.fontSize / 2, y);
        }

        if (this.drop * this.fontSize > this.canvasHeight && Math.random() > 0.975) {
            this.drop = Math.random() * -50;
            this.fallSpeed = (Symbol.MIN_SPEED + Math.random() * Symbol.SPEED_RANGE) * this.fallSpeed;
            this.trail = [];
            this.prevRow = Math.floor(this.drop);
        } else {
            this.prevRow = headRow;
            this.drop += this.fallSpeed;
        }
    }
}
