import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

/* Services */
import {DependenciesService} from "src/app/services/dependencies.service";
import {MessageService} from "../../../services/messages.service";

@Component({
    selector: 'app-dependencies-modal',
    templateUrl: './dependencies-modal.component.html',
    styleUrls: ['./dependencies-modal.component.css']
})
export class DependenciesModalComponent implements OnInit {

    public dependenciesForm: any;
    public loading = false;

    constructor(
        private dependenciesService: DependenciesService,
        private messagesService: MessageService,
        private formBuilder: UntypedFormBuilder,
        public matDialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.initCreateForm();
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

    createDependency(){
        this.loading = true;
        const data = this.dependenciesForm.value;
        this.dependenciesService.createRecord(data).subscribe({
            next: res => {
                this.loading = false;
                this.messagesService.printStatus(res.message, 'success')
                setTimeout(()=>{
                    this.matDialog.closeAll();
                }, 4000);
            },
            error: err => {
                this.loading = false;
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        })
    }

}
