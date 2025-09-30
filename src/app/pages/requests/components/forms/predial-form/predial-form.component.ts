import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import * as moment from "moment";
import {NgxSpinnerService} from "ngx-spinner";
import {PredialService} from "../../../../../services/predial.service";
import {MessagesService} from "../../../../../services/messages.service";


@Component({
    selector: 'app-predial-form',
    templateUrl: './predial-form.component.html',
    styleUrls: ['./predial-form.component.css']
})
export class PredialFormComponent implements OnInit {

    @Input() request: any;
    @Output() constanciaGenerada: EventEmitter<any> = new EventEmitter();

    public predialesForm: any;
    public catastroValidado: any;
    public currentYear = new Date();

    constructor(
        private spinner: NgxSpinnerService,
        private messagesService: MessagesService,
        private formBuilder: FormBuilder,
        private predialService: PredialService,
    ) {
    }

    ngOnInit(): void {
        this.initLicenciaFuncionamientoForm();
    }

    initLicenciaFuncionamientoForm() {
        this.predialesForm = this.formBuilder.group({
            fecha_oficio: [moment(this.currentYear).format('YYYY-MM-DD'), Validators.required],
            numero_oficio: ['', Validators.required],
            recibo_pago_certificado: ['', Validators.required],
            folio_pago_predial: ['', Validators.required]
        });
    }

    savePredial() {
        this.spinner.show();
        const data = {
            fecha_oficio: moment(this.predialesForm.value.fecha_oficio).format("YYYY-MM-DD"),
            numero_oficio: this.predialesForm.value.numero_oficio,
            recibo_pago_certificado: this.predialesForm.value.recibo_pago_certificado,
            folio_pago_predial: this.predialesForm.value.folio_pago_predial,
        };
        this.predialService.savePredial(this.request.id, data).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success');
                this.constanciaGenerada.emit(true);
            },
            error: (err: any) => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        });
    }

    validarFolioPagoPredial(){
        this.spinner.show();
        const data = {
            folio_pago_predial: this.predialesForm.value.folio_pago_predial,
        }
        this.predialService.validarFolioPagoPredial(data).subscribe({
            next: data => {
                this.spinner.hide();
                this.catastroValidado = data.catastro;
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        })
    }

}
