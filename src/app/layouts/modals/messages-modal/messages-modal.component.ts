import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {RequestsService} from "../../../services/requests.service";
import {MessageService} from "../../../services/messages.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MensajesService} from "../../../services/mensajes.service";

@Component({
    selector: 'app-messages-modal',
    templateUrl: './messages-modal.component.html',
    styleUrls: ['./messages-modal.component.css']
})
export class MessagesModalComponent implements OnInit {

    public records: any;
    public messageForm: any;

    public selectedFile: any;
    public file: any;

    /* Banders */

    public uploadingFile = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private requestService: RequestsService,
        private formBuilder: FormBuilder,
        private mensajeServie: MensajesService,
        private messagesService: MessageService
    ) {
    }

    ngOnInit(): void {
        const requestId = this.data.requestId;
        this.getMessages(requestId);
        this.initMessageForm(requestId);
    }

    initMessageForm(requestId: any) {
        this.messageForm = this.formBuilder.group({
            solicitu_id: requestId,
            mensaje: ['', Validators.required]
        })
    }

    getMessages(requestId: any) {
        this.requestService.getMessages(requestId).subscribe({
            next: res => {
                this.records = res.mensajes;
            },
            error: err => {
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        })
    }

    createMessage(selectedFile: any) {
        this.uploadingFile = true;
        var formData = new FormData();

        const solicitudId = this.messageForm.value.solicitu_id;
        const mensaje = this.messageForm.value.mensaje;

        formData.append('solicitud_id', solicitudId.toString());
        formData.append('mensaje', mensaje);
        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        this.mensajeServie.createRecord(formData).subscribe({
            next: res => {
                this.uploadingFile = false;
                this.messagesService.printStatus(res.mensaje, 'success');
                this.messageForm.reset();
                this.getMessages(this.data.requestId);
                this.selectedFile = false;
            },
            error: err => {
                this.uploadingFile = false;
                this.messagesService.printStatusArrayNew(err.error.errors.message, 'error');
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

        /*reader.onprogress = (data) => {
            value = Math.round(data.loaded / data.total * 100);
        }*/

        /*reader.onload = (e) => {
            value = 100;
            var data = e.target?.result;
            var blob = this.dataURItoBlob(data);
            this.documentFile = blob;

            setTimeout(() => {
                this.resourcesLoaded = true;
                this.loading = false;
                this.value = 0;
            }, 500);
        }*/
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
