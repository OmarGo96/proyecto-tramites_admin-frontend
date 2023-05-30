import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DependenciesModalComponent} from "../../layouts/modals/dependencies-modal/dependencies-modal.component";
import {DependenciesService} from "../../services/dependencies.service";
import {MessageService} from "../../services/messages.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {UsersService} from "../../services/users.service";

@Component({
    selector: 'app-dependencies',
    templateUrl: './dependencies.component.html',
    styleUrls: ['./dependencies.component.css']
})
export class DependenciesComponent implements OnInit {

    public dependencies: any;
    public rol: any;

    constructor(
        private dependenciesService: DependenciesService,
        private usersService: UsersService,
        private messagesService: MessageService,
        private router: Router,
        private spinner: NgxSpinnerService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.rol = this.usersService.getRol();
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
