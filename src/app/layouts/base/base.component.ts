import {AfterViewInit, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {RequestsService} from "../../services/requests.service";

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit, AfterViewInit {

    public isMobile: boolean;
    public badges: any;

    constructor(
        private requestsService: RequestsService,
    ) {
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
