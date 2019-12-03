import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.scss'

import {BubbleBackground} from "./bubbleField/bubbleBackground";
import {PageController} from "./pageController";

let bubbleBackGround = new BubbleBackground(document.querySelector('canvas.bubbleField'));
let pageController = new PageController();

pageController.onWindowResize(() => {
   bubbleBackGround = new BubbleBackground(document.querySelector('canvas.bubbleField'))
});

pageController.onMouseMove((event) => {
   bubbleBackGround.mouseMoved(event)
});


