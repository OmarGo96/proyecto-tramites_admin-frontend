import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RequerimentsService} from "../../../../services/requeriments.service";
import {NgxSpinnerService} from "ngx-spinner";
import {DocumentTypesService} from "../../../../services/document-types.service";
import {MessagesService} from "../../../../services/messages.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'app-update-requeriments-modal',
    templateUrl: './update-requeriments-modal.component.html',
    styleUrls: ['./update-requeriments-modal.component.css']
})
export class UpdateRequerimentsModalComponent implements OnInit {

    public requeriment: any;

    public requirementsForm: any;

    public documentTypes: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private requirementsService: RequerimentsService,
        private spinner: NgxSpinnerService,
        private documentTypesService: DocumentTypesService,
        private messagesService: MessagesService,
        private formBuilder: UntypedFormBuilder,
        private dialogRef: MatDialogRef<any>
    ) {
    }

    ngOnInit(): void {
        this.requeriment = this.data.requeriment;
        this.initUpdateForm();
        this.getDocumentTypes();
    }

    initUpdateForm() {
        this.requirementsForm = this.formBuilder.group({
            tipos_documentos_id: this.requeriment.tipos_documentos_id,
            nombre: this.requeriment.nombre,
            descripcion: this.requeriment.descripcion,
        });
    }

    updateRequirement() {
        this.spinner.show();
        const data = this.requirementsForm.value;
        this.requirementsService.updateRecord(this.requeriment.uuid, data).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success')
                setTimeout(() => {
                    this.dialogRef.close();
                }, 2500);
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        });
    }

    getDocumentTypes() {
        this.documentTypesService.getRecords().subscribe({
            next: res => {
                this.documentTypes = res.documentos;
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        })
    }

}
