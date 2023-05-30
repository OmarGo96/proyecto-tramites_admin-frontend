import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {RequestsStatus} from "../../../const/status";
import {RequestsService} from "../../../services/requests.service";
import {MessageService} from "../../../services/messages.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {MatTableDataSource} from "@angular/material/table";
import * as moment from 'moment';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'app-general-requests',
    templateUrl: './general-requests.component.html',
    styleUrls: ['./general-requests.component.css']
})
export class GeneralRequestsComponent implements OnInit {

    public reportForm: any;

    public dataSource: any;
    public displayedColumns: string[] = ['folio', 'servicio', 'area', 'contribuyente', 'estatus', 'fecha_alta', 'fecha_envio'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public statuses = RequestsStatus;

    public requests: any;

    constructor(
        private requestsService: RequestsService,
        private messagesService: MessageService,
        private formBuilder: FormBuilder,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {
    }

    ngOnInit(): void {
        this.initReportForm();
    }

    initReportForm() {
        this.reportForm = this.formBuilder.group({
            startDate: [moment().format(), Validators.required],
            endDate: [moment().format(), Validators.required]
        });

        this.getRequests();
    }

    getRequests(){
        this.spinner.show();
        const data = {
            startDate: moment(this.reportForm.value.startDate).format('YYYY-MM-DD'),
            endDate: moment(this.reportForm.value.endDate).format('YYYY-MM-DD'),
        };
        this.requestsService.getAllRequests(data).subscribe({
            next: res => {
                this.spinner.hide();
                this.dataSource = new MatTableDataSource(res.solicitudes);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                this.requests = res.solicitudes;
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        });
    }

    downloadReport(){
        this.spinner.show();
        const data = {
            startDate: moment(this.reportForm.value.startDate).format('YYYY-MM-DD'),
            endDate: moment(this.reportForm.value.endDate).format('YYYY-MM-DD'),
        };
        this.requestsService.downloadReport(data).subscribe({
            next: res => {
                this.spinner.hide();
                const url = URL.createObjectURL(res);
                window.open(url);
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        });
    }

}
