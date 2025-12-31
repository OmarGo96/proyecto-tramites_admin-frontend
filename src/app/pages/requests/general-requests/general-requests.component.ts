import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {RequestsStatus} from "../../../const/status";
import {RequestsService} from "../../../services/requests.service";
import {MessagesService} from "../../../services/messages.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {MatTableDataSource} from "@angular/material/table";
import * as moment from 'moment';
import {FormBuilder, Validators} from "@angular/forms";
import {data} from "autoprefixer";
import {ServicesService} from "../../../services/services.service";

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
    public activeServices: any;

    // Agregar estas propiedades
    selectedServiceId: number | null = null;
    originalRequests: any[] = []; // Para guardar los datos originales

    constructor(
        private requestsService: RequestsService,
        private servicesService: ServicesService,
        private messagesService: MessagesService,
        private formBuilder: FormBuilder,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {
    }

    ngOnInit(): void {
        this.initReportForm();
        this.getServices();
    }

    initReportForm() {
        this.reportForm = this.formBuilder.group({
            startDate: ['', Validators.required],
            endDate: ['', Validators.required]
        });
        this.getRequests();
    }

    getRequests(data?: any) {
        this.spinner.show();
        let dates: any;
        if (this.reportForm.value.startDate && this.reportForm.value.endDate) {
            dates = {
                startDate: moment(this.reportForm.value.startDate).format('YYYY-MM-DD'),
                endDate: moment(this.reportForm.value.endDate).format('YYYY-MM-DD'),
            };
        } else {
            dates = {};
        }
        this.requestsService.getAllRequests(dates).subscribe({
            next: res => {
                this.spinner.hide();
                this.originalRequests = res.solicitudes; // Guardar datos originales
                this.requests = res.solicitudes;
                this.applyServiceFilter(); // Aplicar filtro si existe
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        });
    }

    downloadReport() {
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

    getServices() {
        this.servicesService.getActiveServices().subscribe({
            next: res => {
                const services = res.servicios;
                this.activeServices = res.servicios.filter((serv: any) => serv.activo);
            },
            error: err => {
                this.messagesService.printStatusArrayNew(err.error.errors, 'warning');
            }
        });
    }

    applyServiceFilter() {
        let filteredData = [...this.originalRequests];

        if (this.selectedServiceId && this.selectedServiceId !== 0) {
            filteredData = filteredData.filter(
                (request: any) => request.servicio_id === this.selectedServiceId
            );
        }

        this.dataSource = new MatTableDataSource(filteredData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.requests = filteredData;
    }

    // Método del evento del select
    filterByServiceId(event: any) {
        this.selectedServiceId = event.value; // Para mat-select
        this.applyServiceFilter();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
