import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UsersService} from "./users.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LicenciasService {

    public urlApi: string = environment.urlApi;
    public headers: any;
    public token: any;
    constructor(
        private httpClient: HttpClient,
        private usersService: UsersService
    ) {
        this.token = this.usersService.getToken();
        this.headers = new HttpHeaders().set('Authorization', this.token);
    }

    addLicenciasFuncionamiento(solicitudId: any, data: any): Observable<any> {
        return this.httpClient.post(`${this.urlApi}/licencia-funcionamiento/generar-constancia/${solicitudId}`, data);
    }
}
