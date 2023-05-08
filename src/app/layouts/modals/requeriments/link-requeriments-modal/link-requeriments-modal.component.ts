import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {RequerimentsService} from "../../../../services/requeriments.service";
import {MessageService} from "../../../../services/messages.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MatSelect} from "@angular/material/select";
import {RequestsStatus} from "../../../../const/status";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder} from "@angular/forms";

@Component({
    selector: 'app-link-requeriments-modal',
    templateUrl: './link-requeriments-modal.component.html',
    styleUrls: ['./link-requeriments-modal.component.css']
})
export class LinkRequerimentsModalComponent implements OnInit {

    public requeriments: any;

    public service: any

    public dataSource: any;
    public displayedColumns: string[] = ['nombre', 'accion'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private requerimentsService: RequerimentsService,
        private formBuilder: FormBuilder,
        private messagesService: MessageService,
        private router: Router,
        private spinner: NgxSpinnerService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.service = this.data.service;
        // this.getRequeriments();
        this.getRequerimentsByService();
    }

    getRequerimentsByService(){
        this.spinner.show();
        this.requerimentsService.getRequerimentsByService(this.service.uuid).subscribe({
            next: res => {
                this.spinner.hide();
                this.dataSource = new MatTableDataSource(res.requerimientos);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        });
    }

    assignRequeriment(){

    }

    getRequeriments(){
        this.spinner.show();
        this.requerimentsService.getRequeriments().subscribe({
            next: res => {
                this.spinner.hide();
                this.requeriments = res.requerimientos;
                console.log(this.requeriments);
            },
            error: err => {
                console.log(err);
            }
        });
    }

    protected readonly RequestsStatus = RequestsStatus;
}
