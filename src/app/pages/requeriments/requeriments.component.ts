import {Component, OnInit, ViewChild} from '@angular/core';
import {RequestsStatus} from "../../const/status";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {RequestsService} from "../../services/requests.service";
import {MessageService} from "../../services/messages.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {RequerimentsService} from "../../services/requeriments.service";
import {MatTableDataSource} from "@angular/material/table";
import {UploadModalComponent} from "../../layouts/modals/upload-modal/upload-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {
    CreateRequerimentsModalComponent
} from "../../layouts/modals/requeriments/create-requeriments-modal/create-requeriments-modal.component";
import {
    UpdateRequerimentsModalComponent
} from "../../layouts/modals/requeriments/update-requeriments-modal/update-requeriments-modal.component";

@Component({
    selector: 'app-requeriments',
    templateUrl: './requeriments.component.html',
    styleUrls: ['./requeriments.component.css']
})
export class RequerimentsComponent implements OnInit {

    public dataSource: any;
    public displayedColumns: string[] = ['name', 'created_at', 'active', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public statuses = RequestsStatus;

    constructor(
        private requestsService: RequestsService,
        private requerimentsService: RequerimentsService,
        private messagesService: MessageService,
        private router: Router,
        private spinner: NgxSpinnerService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.getRequeriments();
    }

    getRequeriments(){
        this.spinner.show();
        this.requerimentsService.getRequeriments().subscribe({
            next: res => {
                this.spinner.hide();
                this.dataSource = new MatTableDataSource(res.requerimientos);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: err => {
                console.log(err);
            }
        });
    }

    activeInactiveRequeriment(event: any, requerimentUuid: any){
        this.spinner.show();
        const data = {
            action: event.checked ? '1' : '0'
        }
        this.requerimentsService.activeInactiveRequeriment(requerimentUuid, data).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success')
                setTimeout(() => {
                    this.getRequeriments();
                }, 2500);
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        })
    }

    openCreateRequerimentDialog(){
        const config = {
            width: '50%'
        }

        const dialogRef = this.dialog.open(CreateRequerimentsModalComponent, config);

        dialogRef.afterClosed().subscribe(res => {
            this.getRequeriments();
        });
    }

    openUpdateRequerimentDialog(requeriment: any){
        const config = {
            width: '50%',
            data: {
                requeriment
            },
        }

        const dialogRef = this.dialog.open(UpdateRequerimentsModalComponent, config);

        dialogRef.afterClosed().subscribe(res => {
            this.getRequeriments();
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
