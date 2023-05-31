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
    public displayedColumns: string[] = ['folio', 'servicio', 'licencia', 'area', 'contribuyente', 'estatus', 'fecha_alta', 'fecha_envio'];

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
            startDate: [moment().format('YYYY-MM-DD'), Validators.required],
            endDate: [moment().format('YYYY-MM-DD'), Validators.required]
        });

        this.getRequests();
    }

    getRequests(){
        if (this.reportForm.value.startDate && this.reportForm.value.endDate){
            this.spinner.show();
            const data = {
                startDate: moment(this.reportForm.value.startDate).format('YYYY-MM-DD'),
                endDate: moment(this.reportForm.value.endDate).format('YYYY-MM-DD'),
            };
            this.requestsService.getAllRequests(data).subscribe({
                next: res => {
                    console.log(res.solicitudes);
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
        } else {
            this.messagesService.errorAlert([{message: 'El rango de fechas es incorrecto. Intente nueuvamente'}]);
        }

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

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
