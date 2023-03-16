import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit, AfterViewInit {

    public isMobile: boolean;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        if (window.innerWidth <= 1024) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }

}
