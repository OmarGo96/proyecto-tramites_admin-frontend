import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, UntypedFormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

/* Services */
import {DependenciesService} from "src/app/services/dependencies.service";
import {MessagesService} from "../../../services/messages.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
    selector: 'app-dependencies-modal',
    templateUrl: './dependencies-modal.component.html',
    styleUrls: ['./dependencies-modal.component.css']
})
export class DependenciesModalComponent implements OnInit {

    public dependenciesForm: any;
    public loading = false;

    public area: any;
    public forUpdate = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dependenciesService: DependenciesService,
        private messagesService: MessagesService,
        private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        public matDialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.area = this.data.area;
        if (this.area){
            this.initUpdateForm();
            this.forUpdate = true;
        } else {
            this.initCreateForm();
        }

    }

    initCreateForm(){
        this.dependenciesForm = this.formBuilder.group({
            nombre: ['', Validators.required],
            responsable: ['', Validators.required],
            telefono: ['', Validators.required],
            extension: ['', Validators.required],
            email: ['', Validators.required],
            horario: ['', Validators.required],
            ubicacion: ['', Validators.required],
            descripcion: ['', Validators.required]
        })
    }

    initUpdateForm(){
        this.dependenciesForm = this.formBuilder.group({
            nombre: this.area && this.area.nombre ? this.area.nombre: '',
            responsable: this.area && this.area.responsable ? this.area.responsable: '',
            telefono: this.area && this.area.telefono ? this.area.telefono: '',
            extension: this.area && this.area.extension ? this.area.extension: '',
            email: this.area && this.area.email ? this.area.email: '',
            horario: this.area && this.area.horario ? this.area.horario: '',
            ubicacion: this.area && this.area.ubicacion ? this.area.ubicacion: '',
            descripcion: this.area && this.area.descripcion ? this.area.descripcion: ''
        })
    }

    createDependency(){
        this.spinner.show();
        const data = this.dependenciesForm.value;
        this.dependenciesService.createRecord(data).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success')
                setTimeout(()=>{
                    this.matDialog.closeAll();
                }, 4000);
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        })
    }

    updateDependency(){
        this.spinner.show();
        const data = this.dependenciesForm.value;
        this.dependenciesService.updateArea(data, this.area.uuid).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success')
                /*setTimeout(()=>{
                    this.matDialog.closeAll();
                }, 4000);*/
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        })
    }

}
