import {Component, OnInit} from '@angular/core';
import {RequestsService} from "../../../services/requests.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {DocumentsService} from "../../../services/documents.service";
import {MessageService} from "../../../services/messages.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {StatusesService} from "../../../services/statuses.service";
import {
    RequestHistoryModalComponent
} from "../../../layouts/modals/request-history-modal/request-history-modal.component";
import {MessagesModalComponent} from "../../../layouts/modals/messages-modal/messages-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-request-detail',
    templateUrl: './request-detail.component.html',
    styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

    public solicitudForm: any;

    public request: any;
    public requeriments: any;
    public reqWithDocuments: any;
    public reqRejected: any;
    public statuses: any;

    public dataSource: any;
    public displayedColumns: string[] = ['requisito', 'archivo', 'accion'];


    /* Banderas */
    public loading = false;
    public disabledButton = false;

    constructor(
        private requestsService: RequestsService,
        private documentsService: DocumentsService,
        private messagesService: MessageService,
        private statusesService: StatusesService,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private router: Router,
        private _snackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.getId();

    }

    getId() {
        this.activatedRoute.params.subscribe({
            next: res => {
                this.getSolicitud(res['id']);
            },
            error: err => {
                console.log(err);
            }
        });
    }



    getSolicitud(id: any) {
        this.requestsService.getRecord(id).subscribe({
            next: res => {
                this.request = res.solicitud;
                const estatusSolicitud = this.request.estatus_solicitud_id;
                const requeriments = res.requisitos.filter((req: any) => req.Requisito.Documento);
                this.reqRejected = res.requisitos.filter((req: any) => req.Requisito.Documento.estatus === -1);
                this.reqWithDocuments = requeriments;
                this.requeriments = res.requisitos;
                this.dataSource = new MatTableDataSource(res.requisitos);
                this.initSolicitudForm();
                this.getStatuses(this.request.Servicio.id);
                if (estatusSolicitud === 3 || estatusSolicitud === 4 || estatusSolicitud === 7){
                    this.solicitudForm.disable();
                    this.disabledButton = true;
                }
            },
            error: err => {
                console.log(err);
                //this.messagesService.printStatus(err.error.errors, 'error');
            }
        });
    }

    initSolicitudForm() {
        this.solicitudForm = this.formBuilder.group({
            estatus_solicitud_id: this.request.estatus_solicitud_id,
            solicitud_id: this.request.id.toString(),
        });
    }

    updateRequest(){
        const data = {
            estatus_solicitud_id: this.solicitudForm.value.estatus_solicitud_id.toString(),
            solicitud_id: this.solicitudForm.value.solicitud_id
        };
        this.requestsService.updateRecord(data).subscribe({
            next: res => {
                this.messagesService.printStatus(res.message, 'success');
            },
            error: err => {
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        })
    }

    openDocument(documentId: any) {
        this.documentsService.getUserDocument(documentId).subscribe({
            next: res => {
                let url = URL.createObjectURL(res);
                window.open(url, '_blank');
            },
            error: err => {
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        });
    }

    acceptOrDenyDocument(estatus: any, documentId: any) {
        this.loading = true;
        let data = {
            'documentacion_id': documentId.toString(),
            'estatus': estatus.toString()
        };

        this.requestsService.updateEstatusRecord(documentId, data).subscribe({
                next: res => {
                    this.loading = false;
                    this.openSnackBar(estatus === 1 ? 'Se acepto el documento' : 'Se rechazo el documento', '')
                    this.getId();
                },
                error: err => {
                    this.loading = false;
                    this.messagesService.printStatusArrayNew(err.error.errors, 'error');
                }
            }
        );
    }

    saveRequest(status: any){
        this.solicitudForm.controls.estatus_solicitud_id.setValue(status);
        this.solicitudForm.controls.solicitud_id.setValue(this.request.id.toString());
        const data = this.solicitudForm.value;
        this.requestsService.updateRecord(data).subscribe({
            next: res => {
                this.messagesService.printStatus(res.message, 'success');
            },
            error: err => {
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        })
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 2500
        });
    }

    getStatuses(id: any){
        this.statusesService.getRecords(id).subscribe({
            next: res => {
                this.statuses = res.estatuses;
            },
            error: err => {
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        })
    }

    openHistoryDialog(requestId: any): void {
        const config = {
            width: '50%',
            data: {
                requestId
            },
        }

        const dialogRef = this.dialog.open(RequestHistoryModalComponent, config);

        dialogRef.afterClosed().subscribe(res => {
            console.log('The dialog was closed');
        });
    }

    openMessagesDialog(requestId: any): void {
        const config = {
            width: '50%',
            data: {
                requestId
            },
        }

        const dialogRef = this.dialog.open(MessagesModalComponent, config);

        dialogRef.afterClosed().subscribe(res => {
            console.log('The dialog was closed');
        });
    }
}
