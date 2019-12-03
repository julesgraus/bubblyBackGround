import {BubbleBackgroundController} from "./bubbleBackgroundController";

export class BubbleBackground {
    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.positionCanvas();
        this.controller = new BubbleBackgroundController(this.canvas, 150);
    }

    /**
     * Must be triggered when the mouse moved to make the bubble background react to the motion
     *
     * @param {MouseEvent} event
     */
    mouseMoved(event) {
        let canvasBounds = this.canvas.getBoundingClientRect();

        //Take the "scale" of the canvas into account and recalculate the correct mouse position in the canvas
        let scaledPos = {
            x: (event.clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left) * this.canvas.width,
            y: (event.clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top) * this.canvas.height
        };

        this.controller.mouseMoved(scaledPos);
    }

    positionCanvas() {
        this.canvas.style.position = 'absolute';
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        this.canvas.style.left = this.canvas.style.top = '0px';
    }
}