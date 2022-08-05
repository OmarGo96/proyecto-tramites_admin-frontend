import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {UsersService} from "../../../services/users.service";
import {MessageService} from "../../../services/messages.service";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public loginForm: any;

    public loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private messagesService: MessageService,
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
        this.loading = true;
        const data = this.loginForm.value;
        this.usersService.login(data).subscribe({
            next: res => {
                this.loading = false;
                sessionStorage.setItem('token', res.token);
                if (res.rol === 2) {
                    this.getIdentity(res.token)
                } else {
                    sessionStorage.setItem('rol', res.rol)
                    this.router.navigate(['dependencias']);
                }
            },
            error: err => {
                this.loading = false;
                this.messagesService.printStatus(err.error.errors[0].message, 'warning');
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
                this.messagesService.printStatus(err.error.errors.message, 'warning');
            }
        })
    }

}
