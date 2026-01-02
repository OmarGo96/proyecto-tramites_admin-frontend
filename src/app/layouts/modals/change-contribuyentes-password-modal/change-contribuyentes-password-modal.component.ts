import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {ContribuyentesService} from "../../../services/contribuyentes.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MessagesService} from "../../../services/messages.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-change-contribuyentes-password-modal',
    templateUrl: './change-contribuyentes-password-modal.component.html',
    styleUrls: ['./change-contribuyentes-password-modal.component.css']
})
export class ChangeContribuyentesPasswordModalComponent implements OnInit {

    public resetPasswordForm: any;
    public contribuyente: any;
    public hide = true;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private contribuyentesService: ContribuyentesService,
        private spinner: NgxSpinnerService,
        private messagesService: MessagesService,
        private router: Router,
        private dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.contribuyente = this.data.contribuyente;
        this.initPasswordForm();
    }

    initPasswordForm(){
        this.resetPasswordForm = this.formBuilder.group({
            password: ['', Validators.required],
            re_password: ['', Validators.required]
        });
    }

    resetPasword() {
        this.spinner.show();
        const data = this.resetPasswordForm.value;
        this.contribuyentesService.restorePassword(this.contribuyente.uuid, data).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success');
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'warning');
            }
        });
    }

}
