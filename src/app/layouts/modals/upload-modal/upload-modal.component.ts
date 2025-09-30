import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {DocumentsService} from "../../../services/documents.service";
import {MessagesService} from "../../../services/messages.service";

@Component({
    selector: 'app-upload-modal',
    templateUrl: './upload-modal.component.html',
    styleUrls: ['./upload-modal.component.css']
})
export class UploadModalComponent implements OnInit {

    public files: File[] = [];

    /* Banderas */
    public loading: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private documentsService: DocumentsService,
        private messagesService: MessagesService,
        public matDialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
    }

    uploadFiles() {
        this.files.forEach(file => {
            this.createDocuments(file);
        });
    }

    createDocuments(file: any) {
        console.log(file);
        this.loading = true;
        const serviceUuid = this.data.serviceUuid;
        let formData = new FormData()
        formData.append('descripcion', 'Documento creado');
        formData.append('file', file);
        this.documentsService.createRecords(serviceUuid, formData).subscribe({
            next: res => {
                this.loading = false;
                this.messagesService.printStatus(res.message, 'success')
                setTimeout(() => {
                    this.matDialog.closeAll();
                }, 2500);
            },
            error: err => {
                this.loading = false;
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

}
