import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DependenciesModalComponent} from "../../layouts/modals/dependencies-modal/dependencies-modal.component";
import {DependenciesService} from "../../services/dependencies.service";
import {MessageService} from "../../services/messages.service";

@Component({
    selector: 'app-dependencies',
    templateUrl: './dependencies.component.html',
    styleUrls: ['./dependencies.component.css']
})
export class DependenciesComponent implements OnInit {

    public dependencies: any;

    constructor(
        private dependenciesService: DependenciesService,
        private messagesService: MessageService,
        private router: Router,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.getAreas();
    }

    getAreas(){
        this.dependenciesService.getRecords().subscribe({
            next: res => {
                this.dependencies = res.areas;
                console.log(this.dependencies);
            },
            error: err => {
                this.messagesService.printStatus(err.error.errors, 'error');
            }
        })
    }

    openDialog(): void {
        const config = {
            width: '50%',
            data: {
                title: ''
            },
        }

        const dialogRef = this.dialog.open(DependenciesModalComponent, config);

        dialogRef.afterClosed().subscribe(res => {
            console.log('The dialog was closed');
        });
    }
}
