import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RequerimentsService} from "../../../../services/requeriments.service";
import {NgxSpinnerService} from "ngx-spinner";
import {DocumentTypesService} from "../../../../services/document-types.service";
import {MessageService} from "../../../../services/messages.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'app-create-requeriments-modal',
    templateUrl: './create-requeriments-modal.component.html',
    styleUrls: ['./create-requeriments-modal.component.css']
})
export class CreateRequerimentsModalComponent implements OnInit {

    public requirementsForm: any;

    public documentTypes: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private requirementsService: RequerimentsService,
        private spinner: NgxSpinnerService,
        private documentTypesService: DocumentTypesService,
        private messagesService: MessageService,
        private formBuilder: UntypedFormBuilder,
        private dialogRef: MatDialogRef<any>
    ) {
    }

    ngOnInit(): void {
        this.initCreateForm();
        this.getDocumentTypes();
    }

    initCreateForm() {
        this.requirementsForm = this.formBuilder.group({
            tipos_documentos_id: ['', Validators.required],
            nombre: ['', Validators.required],
            descripcion: ['', Validators.required]
        })
    }

    createRequeriment(){
        this.spinner.show();
        const data = this.requirementsForm.value;
        this.requirementsService.createRecord(data).subscribe({
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
