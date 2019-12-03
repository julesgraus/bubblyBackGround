import {Bubble} from "./bubble";
import BubbleImageUrl from '../../img/bubble_small.png'

export class BubbleBackgroundController {
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {int} amount
     */
    constructor(canvas, amount) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.xScale = this.canvas.width / this.canvas.height;
        this.yScale = this.canvas.height / this.canvas.width;

        this.centerX = canvas.width * .5;
        this.centerY = canvas.height * .5;

        this.bubble = null;

        this.enabled = false;

        this.tick = this.tick.bind(this);
        this.createBubble = this.createBubble.bind(this);
        this.enable = this.enable.bind(this);
        this.redraw = this.redraw.bind(this);

        this.createBubble();
        this.enable(true);
        this.redraw();

    }

    enable(enable) {
        this.enabled = enable;
        window.requestAnimationFrame(this.tick);
    }

    tick(timestamp) {
        this.bubble.tick(timestamp);

        this.redraw();
        if(this.enabled) window.requestAnimationFrame(this.tick);
    }

    createBubble() {
        this.bubble = new Bubble(this.canvas, BubbleImageUrl, this.centerX, this.centerY);
    }

    clearCanvas() {
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    redraw() {
        this.clearCanvas();
        this.drawBubble();
    }

    drawBubble() {
        let size = 0.1;
        let width = (this.canvas.width + this.bubble.morphOffsets.x) * size;
        let height = (this.canvas.height + this.bubble.morphOffsets.y) * size * this.xScale;

        this.context.drawImage(
            this.bubble.image,
            this.bubble.currentPosition.x - (width * .5),
            this.bubble.currentPosition.y - (height * .5),
            width,
            height);
    }

    /**
     * @param {object} position and object containing the absolute position within the canvas in properties x and y.
     */
    mouseMoved(position) {
        this.bubble.moveTowards(position);
    }
}