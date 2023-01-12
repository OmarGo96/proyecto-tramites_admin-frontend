import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {UsersService} from "./users.service";

@Injectable({
  providedIn: 'root'
})
export class StatusesService {
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

    public getRecords(id: any): Observable <any> {
        return this.httpClient.get(`${this.urlApi}/estatuses/${id}`, { headers: this.headers });
    }

    public getEstatusById(serviceId: any, estatusId: any): Observable <any> {
        return this.httpClient.get(`${this.urlApi}/estatusesById/${serviceId}/${estatusId}`, { headers: this.headers });
    }
}
