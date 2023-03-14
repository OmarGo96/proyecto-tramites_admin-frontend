import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    public urlApi: string = environment.urlApi;
    public headers: any;
    public token: any;
    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) {
        this.token = this.getToken();
        this.headers = new HttpHeaders().set('Authorization', this.token);
    }

    public login(data: any): Observable<any> {
        return this.httpClient.post(`${this.urlApi}/session/administrador`, data);
    }

    public createRecord(data: any): Observable<any> {
        return this.httpClient.post(`${this.urlApi}/administradores`, data);
    }

    public updateRecord(userUuid: any, data: any): Observable<any> {
        return this.httpClient.put(`${this.urlApi}/administradores/${userUuid}`, data);
    }

    public getRecords(): Observable<any> {
        return this.httpClient.get(`${this.urlApi}/administradores`);
    }

    public getUser(token: any): Observable<any> {
        // const headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.get(`${this.urlApi}/info_administrador`);
    }

    public getToken() {
        let token: any;
        const tokenFromSessionStorage = sessionStorage.getItem('token');

        if (tokenFromSessionStorage !== null) {
            token = tokenFromSessionStorage;
        } else {
            token = false;
        }

        return token;
    }

    public getIdentity() {
        let identity: any;
        const identityFromSessionStorage = sessionStorage.getItem('identity');

        if (identityFromSessionStorage !== null) {
            identity = JSON.parse(identityFromSessionStorage);
        } else {
            identity = false;
        }

        return identity;
    }

    public getRol() {
        let rol: any;
        const rolFromSessionStorage = localStorage.getItem('rol');

        if (rolFromSessionStorage !== null) {
            rol = rolFromSessionStorage;
        } else {
            rol = false;
        }

        return rol;
    }

    logout() {
        sessionStorage.clear();
        this.router.navigate(['login']);
    }
}
