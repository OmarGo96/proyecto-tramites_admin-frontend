import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {UsersService} from "./users.service";

@Injectable({
    providedIn: 'root'
})
export class RequerimentsService {

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
    public createRecord(data: any): Observable <any> {
        return this.httpClient.post(`${this.urlApi}/requerimientos`, data, { headers: this.headers })
    }

    public updateRecord(requirementId: any, data: any): Observable <any> {
        return this.httpClient.put(`${this.urlApi}/requerimientos/${requirementId}`, data, { headers: this.headers })
    }

    public getRequeriments(): Observable <any> {
        return this.httpClient.get(`${this.urlApi}/requerimientos`);
    }

    public activeInactiveRequeriment(requerimentUuid: any, data: any): Observable<any>{
        return this.httpClient.patch(`${this.urlApi}/requerimientos/${requerimentUuid}`, data);
    }

    public getRequerimentsByService(serviceUuid: any): Observable <any> {
        return this.httpClient.get(`${this.urlApi}/requerimientos-servicio/${serviceUuid}`, { headers: this.headers });
    }

    /*public getRequerimentsByService(serviceUuid: any): Observable <any> {
        return this.httpClient.get(`${this.urlApi}/requerimientos/${serviceUuid}`, { headers: this.headers });
    }*/

    public deleteRecord(requerimentUuid: any): Observable <any> {
        return this.httpClient.delete(`${this.urlApi}/requerimientos/${requerimentUuid}`);
    }
}
