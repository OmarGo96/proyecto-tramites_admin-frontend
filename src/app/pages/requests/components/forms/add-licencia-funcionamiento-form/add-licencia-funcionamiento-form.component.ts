import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {MessagesService} from "../../../../../services/messages.service";
import {FormBuilder, Validators} from "@angular/forms";
import * as moment from "moment";
import {LicenciasService} from "../../../../../services/licencias.service";

@Component({
    selector: 'app-add-licencia-funcionamiento-form',
    templateUrl: './add-licencia-funcionamiento-form.component.html',
    styleUrls: ['./add-licencia-funcionamiento-form.component.css']
})
export class AddLicenciaFuncionamientoFormComponent implements OnInit {

    @Input() request: any;
    @Output() licenciaAgreda: EventEmitter<any> = new EventEmitter();

    public licenciaFuncionamientoForm: any;

    public currentYear = new Date();

    constructor(
        private spinner: NgxSpinnerService,
        private licenciasService: LicenciasService,
        private messagesService: MessagesService,
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.initLicenciaFuncionamientoForm();
    }

    initLicenciaFuncionamientoForm() {
        this.licenciaFuncionamientoForm = this.formBuilder.group({
            numero_licencia: [this.request && this.request.LicenciaFuncionamiento ? this.request.LicenciaFuncionamiento.licencia_funcionamiento_id : '', Validators.required],
            fecha_expedicion: [moment(this.currentYear).format('YYYY-MM-DD'), Validators.required],
            fecha_impresion: [moment(this.currentYear).format('YYYY-MM-DD'), Validators.required],
            vigencia: ['', Validators.required],
            numero_expediente: ['', Validators.required],
            recibo_pago_certificado: ['', Validators.required]
        });
    }

    addLicenciaFuncionamiento(){
        this.spinner.show();
        const data = {
            numero_licencia: this.licenciaFuncionamientoForm.value.numero_licencia.toString(),
            fecha_expedicion: moment(this.licenciaFuncionamientoForm.value.fecha_expedicion).format('YYYY-MM-DD'),
            fecha_impresion: moment(this.licenciaFuncionamientoForm.value.fecha_impresion).format('YYYY-MM-DD'),
            vigencia: moment(this.licenciaFuncionamientoForm.value.vigencia).format('YYYY-MM-DD'),
            numero_expediente: this.licenciaFuncionamientoForm.value.numero_expediente,
            recibo_pago_certificado: this.licenciaFuncionamientoForm.value.recibo_pago_certificado
        };
        this.licenciasService.addLicenciasFuncionamiento(this.request.id, data).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success');
                this.licenciaAgreda.emit(true);
            },
            error: (err: any) => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        })
    }
}
