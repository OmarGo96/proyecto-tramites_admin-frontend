import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestsService} from "../../../services/requests.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MessagesService} from "../../../services/messages.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-asignar-licencia-modal',
    templateUrl: './asignar-licencia-modal.component.html',
    styleUrls: ['./asignar-licencia-modal.component.css']
})
export class AsignarLicenciaModalComponent implements OnInit {

    public form: FormGroup;

    public solicitudId: any;

    constructor(
        private formBuilder: FormBuilder,
        private requestService: RequestsService,
        private messagesService: MessagesService,
        private spinner: NgxSpinnerService,
        private dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    }

    ngOnInit(): void {
        this.solicitudId = this.data.solicitud_id;
        this.initForm();
    }

    initForm(){
        this.form = this.formBuilder.group({
            numero_licencia: ['', Validators.required],
        })
    }

    asignarNumeroLicencia(){
        this.spinner.show();
        const data = this.form.value;
        this.requestService.asignarNumLicencia(data, this.solicitudId).subscribe({
            next: data => {
                this.spinner.hide();
                this.messagesService.printStatus(data.message, 'success');
                this.dialogRef.close(true);
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        })
    }

}
