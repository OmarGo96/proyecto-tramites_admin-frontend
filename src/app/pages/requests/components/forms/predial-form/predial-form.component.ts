import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import * as moment from "moment";


@Component({
    selector: 'app-predial-form',
    templateUrl: './predial-form.component.html',
    styleUrls: ['./predial-form.component.css']
})
export class PredialFormComponent implements OnInit {

    private formBuilder = inject(FormBuilder);

    public predialesForm: any;
    public catastroValidado: any;
    public currentYear = new Date();

    constructor() {
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

}
