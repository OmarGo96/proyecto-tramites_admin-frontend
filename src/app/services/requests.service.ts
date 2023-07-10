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

    public getAllRequests(data: any): Observable <any> {
        return this.httpClient.post(`${this.urlApi}/reportes/generateByDateRange`, data, { headers: this.headers });
    }

    public getRecords(data: any): Observable <any> {
        return this.httpClient.post(`${this.urlApi}/todas_solicitudes`, data, { headers: this.headers });
    }
    public getRecord(id: any): Observable <any> {
        return this.httpClient.get(`${this.urlApi}/solicitud-detalle/${id}`, {headers: this.headers});
    }

    public updateRecord(data: any, solicitudId: any): Observable <any> {
        return this.httpClient.post(`${this.urlApi}/cambiar_solicitud_estatus/${solicitudId}`, data, { headers: this.headers });
    }

    public addVisit(data: any, solicitudId: any): Observable <any> {
        return this.httpClient.post(`${this.urlApi}/solicitud/fecha-visita/${solicitudId}`, data, { headers: this.headers });
    }

    public updateEstatusRecord(id: any, data: any): Observable <any> {
        return this.httpClient.put(`${this.urlApi}/cambiar_estatus_documentacion/${id}`, data, {headers: this.headers});
    }

    public updateEstatusPaymentDoc(id: any, data: any): Observable <any> {
        return this.httpClient.put(`${this.urlApi}/validar_documentacion_pago/${id}`, data, {headers: this.headers});
    }

    public updateEstatusAnuenciaDoc(id: any, data: any): Observable <any> {
        return this.httpClient.put(`${this.urlApi}/validar-documento-anuencia/${id}`, data, {headers: this.headers});
    }

    public updateEstatusComplementaryDoc(id: any, data: any): Observable <any> {
        return this.httpClient.put(`${this.urlApi}/validar-documento-complementario/${id}`, data, {headers: this.headers});
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

    public downloadReport(data: any): Observable <any> {
        return this.httpClient.post(`${this.urlApi}/reportes/generateByDateRange/excel`, data, { headers: this.headers, responseType: 'blob' });
    }

    public validateFolio(data: any): Observable <any> {
        return this.httpClient.post(`${this.urlApi}/solicitud/check/pase-caja`, data, { headers: this.headers });
    }
}
