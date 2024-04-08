import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {UsersService} from "../../../services/users.service";
import {MessageService} from "../../../services/messages.service";
import {NgxSpinnerService} from "ngx-spinner";
import * as moment from 'moment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public loginForm: any;

    public loading = false;

    public currentYear = moment().format('YYYY')

    constructor(
        private formBuilder: UntypedFormBuilder,
        private usersService: UsersService,
        private messagesService: MessageService,
        private spinner: NgxSpinnerService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.initLoginForm()
    }

    initLoginForm() {
        this.loginForm = this.formBuilder.group({
            usuario: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    onLogin() {
        this.spinner.show();
        const data = this.loginForm.value;
        this.usersService.login(data).subscribe({
            next: res => {
                this.spinner.hide();
                sessionStorage.setItem('token', res.token);
                sessionStorage.setItem('rol', res.rol);
                sessionStorage.setItem('usuario', res.name);
                sessionStorage.setItem('dependencia', res.dependencia);

                if (res.rol !== 4){
                    this.router.navigate(['solicitudes/todas']);
                } else {
                    this.router.navigate(['contribuyentes']);
                }
                
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        });
    }

    getIdentity(token: any) {
        this.usersService.getUser(token).subscribe({
            next: res => {
                const identity = res.administrador;
                sessionStorage.setItem('identity', JSON.stringify(identity));
                sessionStorage.setItem('rol', res.administrador.rol);
                this.router.navigate(['dependencias']);
            },
            error: err => {
                this.messagesService.printStatusArrayNew(err.error.errors, 'warning');
            }
        })
    }

}
