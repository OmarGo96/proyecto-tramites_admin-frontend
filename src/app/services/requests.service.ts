import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {UsersService} from "./users.service";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
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

    public getRecords(data: any): Observable <any> {
        return this.httpClient.post(`${this.urlApi}/todas_solicitudes`, data, { headers: this.headers });
    }
    public getRecord(id: any): Observable <any> {
        return this.httpClient.get(`${this.urlApi}/solicitud-detalle/${id}`, {headers: this.headers});
    }

    public updateRecord(data: any): Observable <any> {
        return this.httpClient.post(`${this.urlApi}/cambiar_solicitud_estatus`, data, { headers: this.headers });
    }

    public updateEstatusRecord(id: any, data: any): Observable <any> {
        return this.httpClient.put(`${this.urlApi}/cambiar_estatus_documentacion/${id}`, data, {headers: this.headers});
    }

    public updateEstatusPaymentDoc(id: any, data: any): Observable <any> {
        return this.httpClient.put(`${this.urlApi}/validar_documentacion_pago/${id}`, data, {headers: this.headers});
    }

    public updateEstatusAnuenciaDoc(docAnuenciaId: any, data: any): Observable <any> {
        return this.httpClient.put(`${this.urlApi}/solicitud/validar-anuencia/${docAnuenciaId}`, data, {headers: this.headers});
    }

    public getHistory(id: any): Observable <any> {
        return this.httpClient.get(`${this.urlApi}/solicitud/history/${id}`, {headers: this.headers});
    }

    public getMessages(id: any): Observable <any> {
        return this.httpClient.get(`${this.urlApi}/solicitud/messages/${id}`, {headers: this.headers});
    }

    public getBadges(): Observable <any> {
        return this.httpClient.get(`${this.urlApi}/solicitudes/badges/count`, {headers: this.headers});
    }
}
