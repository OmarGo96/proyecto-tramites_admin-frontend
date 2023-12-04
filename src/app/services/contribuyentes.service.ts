import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class ContribuyentesService {
    public urlApi: string = environment.urlApi;
    public headers = new HttpHeaders().set('Content-Type', 'application/json');
    public token: any;

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) { }

    public getContribuyentes(): Observable<any> {
        return this.httpClient.get(`${this.urlApi}/contribuyentes`);
    }

    public getExpedienteContribuyente(contribuyenteUuid: any): Observable<any> {
        return this.httpClient.get(`${this.urlApi}/contribuyente/expediente/${contribuyenteUuid}`, { responseType: 'blob',});
    }
}
