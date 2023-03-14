import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DependenciesModalComponent} from "../../layouts/modals/dependencies-modal/dependencies-modal.component";
import {DependenciesService} from "../../services/dependencies.service";
import {MessageService} from "../../services/messages.service";
import {NgxSpinnerService} from "ngx-spinner";

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
        private spinner: NgxSpinnerService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.getAreas();
    }

    getAreas(){
        this.spinner.show();
        this.dependenciesService.getRecords().subscribe({
            next: res => {
                this.spinner.hide();
                this.dependencies = res.areas;
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
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
