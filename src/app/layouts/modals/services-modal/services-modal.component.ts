import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

import {MessageService} from "src/app/services/messages.service";
import {ServicesService} from "../../../services/services.service";
import {getLocaleFirstDayOfWeek} from "@angular/common";

@Component({
    selector: 'app-services-modal',
    templateUrl: './services-modal.component.html',
    styleUrls: ['./services-modal.component.css']
})
export class ServicesModalComponent implements OnInit {

    public servicesForm: any;

    /* Banderas */
    public loading = false;
    public editing = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private servicesService: ServicesService,
        private messagesService: MessageService,
        private formBuilder: FormBuilder,
        public matDialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        if (this.data.service){
            this.initUpdateForm();
        } else {
            this.initCreateForm()
        }

    }

    initCreateForm(){
        this.editing = false;
        this.servicesForm = this.formBuilder.group({
            area_uuid: this.data.areaUuid,
            nombre: ['', Validators.required],
            clave: ['', Validators.required],
            costo: ['', Validators.required],
            vigencia: ['', Validators.required],
            tiempo: ['', Validators.required],
            documento_expedido: ['', Validators.required],
            descripcion: ['', Validators.required],
            activo: ['', Validators.required],
            en_linea: ['', Validators.required]
        })
    }

    initUpdateForm(){
        this.editing = true;
        this.servicesForm = this.formBuilder.group({
            servicio_uuid: this.data.service.uuid,
            nombre: this.data.service.nombre,
            clave: this.data.service.clave,
            costo: this.data.service.costo,
            vigencia: this.data.service.vigencia,
            tiempo: this.data.service.tiempo,
            documento_expedido: this.data.service.documento_expedido,
            descripcion: this.data.service.descripcion,
            activo: this.data.service.activo,
            en_linea: this.data.service.en_linea
        })
    }

    createService(){
        this.loading = true;
        const data = this.servicesForm.value;
        this.servicesService.createRecord(data).subscribe({
            next: res => {
                this.loading = false;
                this.messagesService.printStatus(res.message, 'success')
                setTimeout(()=>{
                    this.matDialog.closeAll();
                }, 2500);
            },
            error: err => {
                this.loading = false;
                this.messagesService.printStatus(err.error.errors, 'error');
            }
        })
    }

    updateService(){
        this.loading = true;
        const data = this.servicesForm.value;
        this.servicesService.updateRecord(data.servicio_uuid, data).subscribe({
            next: res => {
                this.loading = false;
                this.messagesService.printStatus(res.message, 'success')
                setTimeout(()=>{
                    this.matDialog.closeAll();
                }, 2500);
            },
            error: err => {
                this.loading = false;
                this.messagesService.printStatus(err.error.errors, 'error');
            }
        });
    }

}
