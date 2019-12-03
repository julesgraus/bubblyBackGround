import TWEEN from '@tweenjs/tween.js';

export class Bubble {
    constructor(canvas, imageUrl, centerX, centerY) {
        this.canvas = canvas;
        this.startX = centerX;
        this.startY = centerY;
        this.currentPosition = {x: this.startX, y: this.startY};
        this.moveSpeed = 20000;

        this.morphAmount = 100;
        this.morphOffsets = {x: this.morphAmount, y: this.morphAmount};
        this.morphSpeed = 400;
        this.previousFrameTimestamp = null;

        this.tick = this.tick.bind(this);
        this.random = this.random.bind(this);
        this.moveTowards = this.moveTowards.bind(this);
        this.motionActBubbly = this.motionActBubbly.bind(this);

        this.image = new Image();
        this.image.src = imageUrl;

        this.maxX = this.canvas.width * .65;
        this.minX = this.canvas.width * .35;
        this.maxY = this.canvas.height * .65;
        this.minY = this.canvas.height * .35;

        this.positionTween = null;
        this.morphTween = null;

        this.motionActBubbly()
    }

    tick(timestamp) {
        if(!this.previousFrameTimestamp) {
            this.previousFrameTimestamp = timestamp;
        }
        // let msBetweenFrames = timestamp - this.previousFrameTimestamp;
        this.previousFrameTimestamp = timestamp;
        // console.log('FPS: '+(1000 / msBetweenFrames));
        TWEEN.update();
    }
    
    motionActBubbly() {
        let self = this;

        let bubblyMotionTweener = function() {
            console.log('trigger');
            self.morphTween = new TWEEN.Tween(self.morphOffsets);
            self.morphTween.easing(TWEEN.Easing.Bounce.InOut);
            let newX = self.random(self.morphAmount * 0.4, self.morphAmount);
            let newY = self.random(self.morphAmount * 0.5, self.morphAmount);
            self.morphTween.to({x: newX, y: newY}, self.morphSpeed).repeat(1).yoyo(true);
            self.morphTween.start();

            self.morphTween.onUpdate((morphAmount, elapsed) => {
                self.morphOffsets = morphAmount;
            }).onComplete(bubblyMotionTweener);
        };

        bubblyMotionTweener();
    }

    /**
     * @param {object} position and object containing the absolute position within the canvas in properties x and y.
     */
    moveTowards(position) {
        //Animate it if not already
        let moveTo = { x: position.x, y: position.y };
        
        if(moveTo.x > this.maxX) moveTo.x = this.maxX + this.random(-50, 50);
        else if(moveTo.x < this.minX) moveTo.x = this.minX + this.random(-50, 50);

        if(moveTo.y > this.maxY) moveTo.y = this.maxY + this.random(-50, 50);
        else if(moveTo.y < this.minY) moveTo.y = this.minY + this.random(-50, 50);

        if(this.positionTween) this.positionTween.stop();
        this.positionTween = new TWEEN.Tween(this.currentPosition);
        this.positionTween.easing(TWEEN.Easing.Elastic.Out);
        this.positionTween.to(moveTo, this.moveSpeed);
        this.positionTween.start();

        this.positionTween.onUpdate((coords, elapsed) => {
            this.currentPosition = coords;
        })
    }

    random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

    map(input, inMin, inMax, outMin, outMax) {
        return (input - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
}