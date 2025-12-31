import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {UsersService} from "./users.service";

@Injectable({
    providedIn: 'root'
})
export class ServicesService {
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

    public getServices(uuid: any): Observable <any> {
        return this.httpClient.get(`${this.urlApi}/servicios/${uuid}`, { headers: this.headers });
    }

    public getRecord(uuid: any): Observable<any> {
        return this.httpClient.get(`${this.urlApi}/servicio/${uuid}`, { headers: this.headers });
    }

    public getDocument(uuid: any): Observable<any> {
        return this.httpClient.get(`${this.urlApi}/documento_servicios/${uuid}`, { responseType: 'blob' });
    }

    public createRecord(data: any): Observable <any> {
        return this.httpClient.post(`${this.urlApi}/servicios`, data, { headers: this.headers })
    }

    public updateRecord(uuid: any, data: any): Observable <any> {
        return this.httpClient.put(`${this.urlApi}/servicios/${uuid}`, data, { headers: this.headers })
    }

    public getActiveServices(): Observable <any> {
        return this.httpClient.get(`${this.urlApi}/servicios`);
    }



}
