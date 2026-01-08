import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {UsersService} from "./users.service";

@Injectable({
    providedIn: 'root'
})
export class DocumentsService {
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

    public createRecords(serviceUuid: any, data: any): Observable<any> {
        return this.httpClient.post(`${this.urlApi}/adjuntar_documento_servicio/${serviceUuid}`, data)
    }

    public getUserDocument(id: any): Observable<any> {
        return this.httpClient.get(`${this.urlApi}/archivo_documentacion/${id}`, { responseType: 'blob' });
    }

    public downloadZip(id: any): Observable<any> {
        return this.httpClient.get(`${this.urlApi}/solicitud/get-documents-zip/${id}`, { responseType: 'blob'});
    }

    public downloadPaymentZip(solicitudId: any): Observable<any> {
        return this.httpClient.get(`${this.urlApi}/documentacion-pago-zip/${solicitudId}`, { responseType: 'blob' });
    }

    public digitalizarDocumento(requestId: any, data: any): Observable<any> {
        return this.httpClient.post(`${this.urlApi}/solicitud/documento-digital/${requestId}`, data)
    }

    public getAnuenciaDocument(requestId: any): Observable<any> {
        return this.httpClient.get(`${this.urlApi}/solicitud/documento-anuencia/${requestId}`, { responseType: 'blob' });
    }

    public generarPaseCaja(requestId: any, data: any): Observable<any> {
        return this.httpClient.post(`${this.urlApi}/solicitud/pase-caja/${requestId}`, data)
    }

    public uploadInvoiceFile(data: any): Observable<any> {
        return this.httpClient.post(`${this.urlApi}/documentacion`, data, {headers: this.headers})
    }

    public updateDocumentType(data: any): Observable<any> {
        return this.httpClient.put(`${this.urlApi}/update/tipo_documento`, data, {headers: this.headers})
    }
}
