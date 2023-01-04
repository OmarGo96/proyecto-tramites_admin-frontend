import {Component, OnInit} from '@angular/core';
import {RequestsService} from "../../../services/requests.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {DocumentsService} from "../../../services/documents.service";
import {MessageService} from "../../../services/messages.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {StatusesService} from "../../../services/statuses.service";
import {
    RequestHistoryModalComponent
} from "../../../layouts/modals/request-history-modal/request-history-modal.component";
import {MessagesModalComponent} from "../../../layouts/modals/messages-modal/messages-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {NgxSpinnerService} from "ngx-spinner";
import {MensajesService} from "../../../services/mensajes.service";

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
    public messages: any;
    public histories: any;
    public messageForm: any;
    public selectedFile: any;
    public file: any;

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
        private mensajeServie: MensajesService,
        private formBuilder: UntypedFormBuilder,
        private dialog: MatDialog,
        private router: Router,
        private activeRouter: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute,
        private spinner: NgxSpinnerService
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

    initSolicitudForm() {
        this.solicitudForm = this.formBuilder.group({
            estatus_solicitud_id: ['', Validators.required],
            solicitud_id: this.request.id.toString(),
        });
    }

    initMessageForm() {
        this.messageForm = this.formBuilder.group({
            solicitud_id: this.request.id.toString(),
            mensaje: ['']
        });
    }

    getSolicitud(id: any) {
        this.spinner.show();
        this.requestsService.getRecord(id).subscribe({
            next: res => {
                this.spinner.hide();
                this.request = res.solicitud;
                const estatusSolicitud = this.request.estatus_solicitud_id;
                this.reqWithDocuments = res.requisitos.filter((req: any) => req.Requisito.Documento);
                this.reqRejected = res.requisitos.filter((req: any) => req.Requisito.Documento.estatus === -1);
                this.requeriments = res.requisitos;
                console.log('requerimientos rechazados -> ' + this.reqRejected.length);
                console.log('requerimientos docs ->' + this.reqWithDocuments.length)
                console.log('requerimientos ->' + this.requeriments.length);
                this.dataSource = new MatTableDataSource(res.requisitos);

                this.getHistory(res.solicitud.id);
                this.getStatuses(this.request.Servicio.id);
                this.getMessages(res.solicitud.id);
                this.initMessageForm();
                this.initSolicitudForm();

                if (estatusSolicitud === 3 || estatusSolicitud === 7){
                    this.solicitudForm.disable();
                    this.disabledButton = true;
                }
            },
            error: err => {
                this.spinner.hide();
                console.log(err);
            }
        });
    }



    updateRequest(){
        this.spinner.show();
        const data = {
            estatus_solicitud_id: this.solicitudForm.value.estatus_solicitud_id.toString(),
            solicitud_id: this.solicitudForm.value.solicitud_id
        };
        this.requestsService.updateRecord(data).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success');
                setTimeout(() => {
                    this.router.navigate(['solicitudes']);
                }, 2500);
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        })
    }

    openDocument(documentId: any) {
        this.spinner.show();
        this.documentsService.getUserDocument(documentId).subscribe({
            next: res => {
                this.spinner.hide();
                let url = URL.createObjectURL(res);
                window.open(url, '_blank');
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        });
    }

    acceptOrDenyDocument(estatus: any, documentId: any) {
        this.spinner.show();
        let data = {
            'documentacion_id': documentId.toString(),
            'estatus': estatus.toString()
        };

        this.requestsService.updateEstatusRecord(documentId, data).subscribe({
                next: res => {
                    this.spinner.hide();
                    this.openSnackBar(estatus === 1 ? 'Se acepto el documento' : 'Se rechazo el documento', '')
                    this.getId();
                },
                error: err => {
                    this.spinner.hide();
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

    getHistory(requestId: any){
        this.requestsService.getHistory(requestId).subscribe({
            next: res => {
                this.histories = res.history;
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        });
    }

    getMessages(requestId: any) {
        this.requestsService.getMessages(requestId).subscribe({
            next: res => {
                this.messages = res.mensajes;
                console.log(res.mensajes);
            },
            error: err => {
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        })
    }

    createMessage(selectedFile: any) {
        this.spinner.show();
        var formData = new FormData();

        const solicitudId = this.messageForm.value.solicitud_id;
        const mensaje = this.messageForm.value.mensaje;

        formData.append('solicitud_id', solicitudId.toString());
        formData.append('mensaje', mensaje);
        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        this.mensajeServie.createRecord(formData).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success');
                this.selectedFile = false;
                this.getId();
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        });
    }

    getFile(event: any) {
        var reader = new FileReader();
        this.selectedFile = event.target.files[0];

        reader.readAsDataURL(this.selectedFile);

        reader.onload = (e) => {
            var data = e.target?.result;
            var blob = this.dataURItoBlob(data);
            this.file = blob;
        }
    }

    dataURItoBlob(dataURI: any) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type: mimeString});
    }

    seeDocument() {
        if (this.file) {
            let url = URL.createObjectURL(this.file)
            window.open(url, '_blank')
        } else {
            this.messagesService.printStatus('Hubo un error, intente de nuevo más tarde', 'error');
        }
    }
}
