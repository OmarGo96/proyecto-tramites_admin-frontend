import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {RequestsStatus} from "../../../const/status";
import {RequestsService} from "../../../services/requests.service";
import {MessageService} from "../../../services/messages.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";

@Component({
    selector: 'app-payment-requests',
    templateUrl: './payment-requests.component.html',
    styleUrls: ['./payment-requests.component.css']
})
export class PaymentRequestsComponent implements OnInit {

    public dataSource: any;
    public displayedColumns: string[] = ['folio', 'tramite', 'creado', 'estatus', 'accion'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public statuses = RequestsStatus;

    constructor(
        private requestsService: RequestsService,
        private messagesService: MessageService,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {

    }

    ngOnInit(): void {
        this.getRequests();
    }

    getRequests() {
        this.spinner.show();
        const data = {
            estatus: '10'
        }
        this.requestsService.getRecords(data).subscribe({
            next: res => {
                this.spinner.hide();
                this.dataSource = new MatTableDataSource(res.solicitudes);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        });
    }

    updateRequest(solicitudId: any) {
        this.spinner.show();
        const data = {
            estatus_solicitud_id: '12',
            solicitud_id: solicitudId.toString(),
        };
        this.requestsService.updateRecord(data).subscribe({
            next: res => {
                this.spinner.hide();
                console.log('La solicitud se abrio y paso a estatus "Revision"');
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        })
    }

    applyFilter(event: Event
    ) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}