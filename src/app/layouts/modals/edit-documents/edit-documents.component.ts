import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {UsersService} from "../../../services/users.service";
import {DependenciesService} from "../../../services/dependencies.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MessagesService} from "../../../services/messages.service";
import {DocumentsService} from "../../../services/documents.service";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
    selector: 'app-edit-documents',
    templateUrl: './edit-documents.component.html',
    styleUrls: ['./edit-documents.component.css']
})
export class EditDocumentsComponent implements OnInit {

    public documentForm: any;
    public document: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private documentsService: DocumentsService,
        private spinner: NgxSpinnerService,
        private messagesService: MessagesService,
        private dialog: DialogRef
    ) {
    }

    ngOnInit(): void {
        this.document = this.data.document;
        console.log(this.document);
        this.initDocumentForm();
    }

    initDocumentForm(){
        this.documentForm = this.formBuilder.group({
            id: this.document && this.document.id ? this.document.id : [''],
            nombre: this.document && this.document.nombre ? this.document.nombre : [''],
        })
    }

    updateDocument(){
        this.spinner.show();
        const data = this.documentForm.value;
        this.documentsService.updateDocumentType(data).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success');
                this.dialog.close(res);
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        })
    }

}
