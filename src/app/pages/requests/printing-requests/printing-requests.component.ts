import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {RequestsStatus} from "../../../const/status";
import {RequestsService} from "../../../services/requests.service";
import {MessagesService} from "../../../services/messages.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {DocumentsService} from "../../../services/documents.service";
import {
    AsignarLicenciaModalComponent
} from "../../../layouts/modals/asignar-licencia-modal/asignar-licencia-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-printing-requests',
    templateUrl: './printing-requests.component.html',
    styleUrls: ['./printing-requests.component.css']
})
export class PrintingRequestsComponent implements OnInit {

    public dataSource: any;
    public displayedColumns: string[] = ['folio', 'servicio', 'licencia', 'area', 'contribuyente', 'creado', 'estatus', 'accion'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public statuses = RequestsStatus;

    constructor(
        private requestsService: RequestsService,
        private documentsService: DocumentsService,
        private messagesService: MessagesService,
        private router: Router,
        private dialog: MatDialog,
        private spinner: NgxSpinnerService
    ) {
    }

    ngOnInit(): void {
        this.getRequests();
    }

    getRequests(){
        this.spinner.show();
        const data = {
            estatus: '16'
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

    downloadZip(requestId: any){
        this.spinner.show();
        this.documentsService.downloadZip(requestId).subscribe({
            next: res => {
                this.spinner.hide();
                let url = URL.createObjectURL(res);
                window.open(url, '_blank');
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert([{message:'No es posible generar zip en estos momentos.'}])
            }
        });
    }

    cancelRequest(solicitudId: any){
        this.messagesService.confirmDelete('¿Estás seguro de cancelar esta solicitud?')
            .then((result: any) => {
                if (result.isConfirmed) {
                    this.spinner.show();
                    const data = {
                        estatus_solicitud_id: '7'
                    };
                    this.requestsService.updateRecord(data, solicitudId).subscribe({
                        next: res => {
                            this.spinner.hide();
                            this.messagesService.printStatus(res.message, 'success');
                            setTimeout(() => {
                                this.getRequests();
                            }, 2500)
                        },
                        error: err => {
                            this.spinner.hide();
                            this.messagesService.printStatusArrayNew(err.error.errors, 'error');
                        }
                    });
                }
            });
    }

    openAsignarNumLicencia(requestId: any){
        const config = {
            data:{
                solicitud_id: requestId,
            }
        }

        const dialogRef = this.dialog.open(AsignarLicenciaModalComponent, config);

        dialogRef.afterClosed().subscribe(res => {
            if (res){
                this.getRequests();
            }
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


}
