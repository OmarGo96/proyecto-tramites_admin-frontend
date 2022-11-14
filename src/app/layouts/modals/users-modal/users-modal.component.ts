import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {UsersService} from "../../../services/users.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MessageService} from "../../../services/messages.service";

@Component({
    selector: 'app-users-modal',
    templateUrl: './users-modal.component.html',
    styleUrls: ['./users-modal.component.css']
})
export class UsersModalComponent implements OnInit {

    public userForm: any;
    public user: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private spinner: NgxSpinnerService,
        private messagesService: MessageService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.user = this.data.user;
        this.initUserForm();
    }

    initUserForm(){
        this.userForm = this.formBuilder.group({
            rol: this.user && this.user.rol ? this.user.rol.toString() : [''],
            nombre: this.user && this.user.nombre ? this.user.nombre : [''],
            apellidos: this.user && this.user.apellidos ? this.user.apellidos : [''],
            usuario: this.user && this.user.usuario ? this.user.usuario : [''],
            activo: this.user && this.user.activo ? this.user.activo.toString() : ['']
        })
    }

    updateUser(){
        this.spinner.show();
        const data = this.userForm.value;

        this.usersService.updateRecord(this.user.uuid, data).subscribe({
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
