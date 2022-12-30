import {Component, OnInit, ViewChild} from '@angular/core';
import {RequestsService} from "../../services/requests.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MessageService} from "../../services/messages.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
    selector: 'app-requests',
    templateUrl: './requests.component.html',
    styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

    public dataSource: any;
    public displayedColumns: string[] = ['folio', 'tramite', 'creado', 'estatus', 'accion'];
    public expandedElement: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public loading = false;

    constructor(
        private requestsService: RequestsService,
        private messagesService: MessageService,
        private spinner: NgxSpinnerService
    ) {
    }

    ngOnInit(): void {
        this.getServices();
    }

    getServices(){
        this.spinner.show();
        this.requestsService.getRecords().subscribe({
            next: res => {
                console.log(res.solicitudes);
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

    updateRequest(solicitudId: any){
        this.spinner.show();
        const data = {
            estatus_solicitud_id: '12',
            solicitud_id: solicitudId.toString() ,
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

}
