import * as rxjs from 'rxjs';
import {fromEvent} from "rxjs";
import {debounceTime} from "rxjs/operators";

export class PageController {
    constructor() {
        this.contactButtonClicked = this.contactButtonClicked.bind(this);

        this.contactButton = document.getElementById('contact');

        this.windowResizeObservable = fromEvent(window, 'resize').pipe(debounceTime(100));
        this.windowMouseMoveObservable = fromEvent(window, 'mousemove').pipe(debounceTime(25));

        this.contactButtonClickObservable = fromEvent(this.contactButton, 'click');
        this.contactButtonClickObservable.subscribe(this.contactButtonClicked);
    }

    contactButtonClicked() {
        window.location = 'mailto:example.address@gmail.com';
    }

    onWindowResize(callback) {
        this.windowResizeObservable.subscribe(callback)
    }

    onMouseMove(callback) {
        this.windowMouseMoveObservable.subscribe(callback);
    }
}