import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {MessagesService} from "../../../services/messages.service";
import {ContribuyentesService} from "../../../services/contribuyentes.service";

@Component({
    selector: 'app-contribuyentes-modal',
    templateUrl: './contribuyentes-modal.component.html',
    styleUrls: ['./contribuyentes-modal.component.css']
})
export class ContribuyentesModalComponent implements OnInit {

    public contribuyenteForm: any;
    public contribuyente: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private contribuyentesService: ContribuyentesService,
        private spinner: NgxSpinnerService,
        private messagesService: MessagesService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.contribuyente = this.data.contribuyente;
        this.initContribuyentesForm();
    }

    initContribuyentesForm(){
        this.contribuyenteForm = this.formBuilder.group({
            nombre: this.contribuyente && this.contribuyente.nombre ? this.contribuyente.nombre : [''],
            apellidos: this.contribuyente && this.contribuyente.apellidos ? this.contribuyente.apellidos : [''],
            email: this.contribuyente && this.contribuyente.email ? this.contribuyente.email : [''],
            telefono: this.contribuyente && this.contribuyente.telefono ? this.contribuyente.telefono : [''],
            rfc: this.contribuyente && this.contribuyente.rfc ? this.contribuyente.rfc : ['']
        });
    }

    updateContribuyente(){
        this.spinner.show();
        const data = this.contribuyenteForm.value;

        this.contribuyentesService.editContribuyentes(this.contribuyente.uuid, data).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success');
                this.dialog.closeAll();
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        });
    }

}
