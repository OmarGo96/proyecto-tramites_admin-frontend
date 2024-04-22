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
import {RequestsStatus} from "../../../const/status";
import * as moment from 'moment';
import {UsersService} from "../../../services/users.service";

@Component({
    selector: 'app-request-detail',
    templateUrl: './request-detail.component.html',
    styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

    public solicitudForm: any;
    public paseCajaForm: any;
    public visitForm: any;

    public isFolioValidate = false;

    public request: any;
    public requeriments: any;
    public reqWithDocuments: any;
    public reqRejected: any;
    public paymentDocsRejected: any;
    public reqAccepted: any;
    public reqChecked: any;
    public paymentDocs: any;
    public anuenciaDoc = false;
    public statuses: any;
    public messages: any;
    public histories: any;
    public messageForm: any;
    public selectedFile: any;
    public file: any;

    public files: File[] = [];
    public invoices: File[] = [];

    public dataSource: any;
    public displayedColumns: string[] = ['requisito', 'archivo', 'accion'];

    // Constants
    public estatuses = RequestsStatus;


    /* Banderas */
    public loading = false;
    public disabledButton = false;

    public currentDate: any
    public fechaVencimiento: any
    public minDate = moment().format();

    constructor(
        private requestsService: RequestsService,
        private documentsService: DocumentsService,
        private usersService: UsersService,
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
        this.initPaseCajaForm();
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

    initVisitForm() {
        this.visitForm = this.formBuilder.group({
            fecha_visita: this.request.fecha_visita ? [{ value: moment(this.request.fecha_visita).format(), disabled: false}] : ['', Validators.required],
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

    initPaseCajaForm(){
        this.paseCajaForm = this.formBuilder.group({
            folio: [''],
            cantidad_pagar: [''],
            vigencia: [''],
            grupo_tramite_id: [''],
            tramite_id: ['']
        });
    }

    getSolicitud(id: any) {
        this.spinner.show();
        this.requestsService.getRecord(id).subscribe({
            next: res => {
                this.spinner.hide();

                this.request = res.solicitud;
                console.log(this.request);

                this.currentDate = moment(new Date).format('YYYY-MM-DD');
                if (this.request.PaseCaja){
                    this.fechaVencimiento = moment(this.request.PaseCaja.fecha_vencimiento).format('YYYY-MM-DD');
                }

                this.requeriments = res.requisitos;

                this.reqWithDocuments = this.requeriments.filter((req: any) => req.Requisito.Documento); // requisitos con documentos
                this.reqChecked = this.requeriments.filter((req: any) => req.Requisito.Documento && (req.Requisito.Documento.estatus === -1 || req.Requisito.Documento.estatus === 1 || req.Requisito.Documento.estatus === 3));
                this.reqRejected = this.requeriments.filter((req: any) => req.Requisito.Documento && req.Requisito.Documento.estatus === -1); // requisitos rechazados
                this.reqAccepted = this.requeriments.filter((req: any) => req.Requisito.Documento && req.Requisito.Documento.estatus === 1); // requisitos aceptados
                this.paymentDocs = this.request.DocumentosPago.filter((req: any) => req.status === 1 || req.status === -1);
                this.paymentDocsRejected = this.request.DocumentosPago.filter((req: any) => req.status === -1); // requisitos rechazados
                console.log(this.paymentDocsRejected);
                this.anuenciaDoc = this.request.DocumentoAnuencia && (this.request.DocumentoAnuencia.status === 1 || this.request.DocumentoAnuencia.status === -1);

                this.dataSource = new MatTableDataSource(res.requisitos);

                this.getHistory(res.solicitud.id);
                this.getStatuses(this.request.Servicio.id);
                this.getMessages(res.solicitud.id);
                this.initMessageForm();
                this.initSolicitudForm();
                this.initVisitForm();

                const estatusSolicitud = this.request.estatus_solicitud_id;
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
            estatus_solicitud_id: this.solicitudForm.value.estatus_solicitud_id.toString()
        };
        this.requestsService.updateRecord(data, this.solicitudForm.value.solicitud_id).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success');
                setTimeout(() => {
                    this.getId();
                }, 2500);
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        })
    }

    addVisitDate(fechaNull?: any){
        this.spinner.show();
        const data = {
            fecha_visita: this.visitForm.value.fecha_visita
        };
        this.requestsService.addVisit(data, this.request.id).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success');
                this.getId();
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        })
    }

    setVisitDateNull(){
        this.spinner.show();
        const data = {
            fecha_visita: ''
        };
        this.requestsService.addVisit(data, this.request.id).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success');
                this.getId();
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        })
    }

    openDocument(documentacion: any) {
        this.spinner.show();
        this.documentsService.getUserDocument(documentacion.id).subscribe({
            next: res => {
                let downloadURL = window.URL.createObjectURL(res);

                if(res.type == 'application/dwg' || res.type == 'application/dxf') {
                    let link = document.createElement('a');
                    link.href = downloadURL;
                    link.download = documentacion.url;
                    link.click();
                }  else {
                    window.open(downloadURL, '_blank')
                }
                this.spinner.hide();

            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        });
    }

    openDocumentComplementary(documentId: any) {
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

    openPaymentDocument(documentId: any) {
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

    openAnuenciaDocument(requestId: any) {
        this.spinner.show();
        this.documentsService.getUserDocument(requestId).subscribe({
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

    openGiroDocument(documentId: any) {
        this.documentsService.getUserDocument(documentId).subscribe({
            next: res => {
                let url = URL.createObjectURL(res);
                window.open(url, '_blank');
            },
            error: err => {
                this.messagesService.printStatus('Algo salio mal al obtener el documento. Intente mas tarde.', 'warning');
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
                    // this.openSnackBar(estatus === 1 ? 'Se acepto el documento' : estatus === 3 ? 'El archivo no es requerido' : 'Se rechazo el documento', '')
                    this.getId();
                },
                error: err => {
                    this.spinner.hide();
                    this.messagesService.printStatusArrayNew(err.error.errors, 'error');
                }
            }
        );
    }

    acceptOrDenyPaymentDocs(estatus: any, documentId: any){
        this.spinner.show();
        let data = {
            'documentacion_pago_id': documentId.toString(),
            'status': estatus.toString()
        };

        this.requestsService.updateEstatusPaymentDoc(documentId, data).subscribe({
                next: res => {
                    this.spinner.hide();
                    this.getId();
                },
                error: err => {
                    this.spinner.hide();
                    this.messagesService.printStatusArrayNew(err.error.errors, 'error');
                }
            }
        );
    }

    acceptOrDenyAnuenciatDocs(estatus: any, documentId: any){
        this.spinner.show();
        let data = {
            'documentacion_anuencia_id': documentId.toString(),
            'status': estatus.toString()
        };

        this.requestsService.updateEstatusAnuenciaDoc(documentId, data).subscribe({
                next: res => {
                    this.spinner.hide();
                    this.getId();
                },
                error: err => {
                    this.spinner.hide();
                    this.messagesService.printStatusArrayNew(err.error.errors, 'error');
                }
            }
        );
    }

    acceptOrDenyGiroDocs(estatus: any, documentId: any){
        this.spinner.show();
        let data = {
            'documento_licencia_comercial_id': documentId.toString(),
            'status': estatus.toString()
        };

        this.requestsService.updateEstatusGiroDoc(documentId, data).subscribe({
                next: res => {
                    this.spinner.hide();
                    this.getId();
                },
                error: err => {
                    this.spinner.hide();
                    this.messagesService.printStatusArrayNew(err.error.errors, 'error');
                }
            }
        );
    }

    acceptOrDenyComplementaryDocs(estatus: any, documentId: any){
        this.spinner.show();
        let data = {
            'status': estatus.toString()
        };

        this.requestsService.updateEstatusComplementaryDoc(documentId, data).subscribe({
                next: res => {
                    this.spinner.hide();
                    this.getId();
                },
                error: err => {
                    this.spinner.hide();
                    this.messagesService.printStatusArrayNew(err.error.errors, 'error');
                }
            }
        );
    }

    getStatuses(id: any){
        this.statusesService.getEstatusById(this.request.servicio_id, this.request.estatus_solicitud_id).subscribe({
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

    uploadFiles() {
        this.files.forEach(file => {
            this.createDocuments(file);
        });
    }

    createDocuments(file: any) {
        this.spinner.show();
        let formData = new FormData()
        formData.append('file', file);
        this.documentsService.digitalizarDocumento(this.request.id.toString(), formData).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success');
                setTimeout(() => {
                    this.getId()
                }, 1000);
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        })
    }

    enviarPaseCaja() {
        this.files.forEach(file => {
            this.createPaseCaja(file);
        });
    }

    createPaseCaja(file: any) {
        this.spinner.show();

        this.paseCajaForm.controls.cantidad_pagar.enable();
        this.paseCajaForm.controls.vigencia.enable();

        let formData = new FormData();
        const folio = this.paseCajaForm.value.folio;
        const cantidad_pagar  = this.paseCajaForm.value.cantidad_pagar;
        const vigencia   = moment(this.paseCajaForm.value.vigencia).format('YYYY-MM-DD');


        formData.append('file', file);
        formData.append('folio', folio);
        formData.append('cantidad_pagar', cantidad_pagar.toString());
        formData.append('vigencia', moment(vigencia).format('YYYY-MM-DD'));
        formData.append('grupo_tramite_id', this.request.Servicio.grupo_tramite_id.toString());
        formData.append('tramite_id', this.request.Servicio.tramite_id.toString());

        this.documentsService.generarPaseCaja(this.request.id.toString(), formData).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success');
                this.isFolioValidate = false;
                this.updateStatus(10);
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        })
    }

    updateStatus(status: any){
        this.spinner.show();
        const data = {
            estatus_solicitud_id: status.toString()
        };
        this.requestsService.updateRecord(data, this.request.id.toString()).subscribe({
            next: res => {
                this.spinner.hide();
                if (this.usersService.getRol() === '5'){
                    this.router.navigate(['solicitudes/validacion-pago']);
                } else {
                    setTimeout(() => {
                        this.getId();
                    }, 2500);
                }
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        })
    }

    validateFolio(){
        this.spinner.show();
        const data = {
            folioPaseCaja: this.paseCajaForm.value.folio
        }
        this.requestsService.validateFolio(data).subscribe({
            next: res => {
                this.spinner.hide();

                this.messagesService.printStatus('El folio se encontró y validó correctamente.', 'success');
                this.paseCajaForm.controls.cantidad_pagar.setValue(res.data.Importe);
                this.paseCajaForm.controls.cantidad_pagar.disable();
                this.paseCajaForm.controls.vigencia.setValue(res.data.SolicitudVencimientoFecha);
                this.paseCajaForm.controls.vigencia.disable();
                this.isFolioValidate = true;
            },
            error: err => {
                console.log(err);
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.message);
            }
        })
    }

    seeDocument() {
        if (this.file) {
            let url = URL.createObjectURL(this.file)
            window.open(url, '_blank')
        } else {
            this.messagesService.printStatus('Hubo un error, intente de nuevo más tarde', 'error');
        }
    }

    downloadZip(){
        this.spinner.show();
        const requestId = this.request.id;
        this.documentsService.downloadZip(requestId).subscribe({
            next: res => {
                this.spinner.hide();
                let url = URL.createObjectURL(res);
                window.open(url, '_blank');
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        })
    }

    onSelect(event: any) {
        this.files.push(...event.addedFiles);
    }

    onRemove(event: any) {
        this.files.splice(this.files.indexOf(event), 1);
    }

    onSelectPaymentInvoice(event: any) {
        if (this.invoices.length >= 1){
            this.messagesService.printStatus('Solo se puede adjuntar un documento a la vez', 'error');
        } else {
            this.invoices.push(...event.addedFiles);
        }
    }

    onRemovePaymentInvoice(event: any) {
        this.invoices.splice(this.invoices.indexOf(event), 1);
    }

    sendInvoiceFile() {
        this.invoices.forEach(invoice => {
            this.uploadInvoiceFile(invoice);
        });
    }

    uploadInvoiceFile(invoice: any){
        this.spinner.show();
        let formData = new FormData()
        formData.append('tipos_documentos_id', '24');
        formData.append('tipo_documento', '0');
        formData.append('vigencia_inicial', '');
        formData.append('nombre_documento', `Recibo de pago solicitud: ${this.request.folio}`);
        formData.append('vigencia_final', '');
        formData.append('contribuyente_id', this.request.contribuyente_id);
        formData.append('file', invoice);
        this.documentsService.uploadInvoiceFile(formData).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success');
                this.updateReciboPago();
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        })
    }

    updateReciboPago(){
        this.requestsService.updateReciboPago(this.request.id).subscribe({
            next: res => {
                this.updateStatus(11);
            },
            error: err => {
                console.log(err);
            }
        })
    }
}
