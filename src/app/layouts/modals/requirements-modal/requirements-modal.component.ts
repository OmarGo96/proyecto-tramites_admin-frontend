import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, Validators} from "@angular/forms";

/* Services */
import {MessageService} from "src/app/services/messages.service";
import {DocumentTypesService} from "src/app/services/document-types.service";
import {RequerimentsService} from "src/app/services/requeriments.service";

@Component({
    selector: 'app-requirements-modal',
    templateUrl: './requirements-modal.component.html',
    styleUrls: ['./requirements-modal.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class RequirementsModalComponent implements OnInit {
    public dataSource: any;
    public displayedColumns: string[] = ['nombre', 'accion'];
    public expandedElement: any;

    // @ViewChild(MatPaginator) paginator: MatPaginator;

    public requirementsForm: any;


    public documentTypes: any;

    // Banderas
    public loading = false;
    public editing = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private requirementsService: RequerimentsService,
        private documentTypesService: DocumentTypesService,
        private messagesService: MessageService,
        private formBuilder: FormBuilder,
        public matDialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.initCreateForm();
        this.getDocumentTypes();
        this.getRequirements();
    }

    initCreateForm() {
        this.editing = false;
        this.requirementsForm = this.formBuilder.group({
            servicio_uuid: this.data.serviceUuid,
            tipos_documentos_id: ['', Validators.required],
            nombre: ['', Validators.required],
            no_copias: ['', Validators.required],
            descripcion: ['', Validators.required],
            original: false,
            complementario: false,
            obligatorio: false
        })
    }

    initUpdateForm(requirement: any) {
        console.log(requirement);
        this.editing = true;
        this.requirementsForm = this.formBuilder.group({
            servicio_uuid: this.data.serviceUuid,
            uuid: requirement.Requisito.uuid,
            requisito_id: requirement.id,
            requisitos_id: requirement.requisitos_id,
            servicios_id: requirement.servicios_id,
            tipos_documentos_id: requirement.Requisito.tipos_documentos_id,
            nombre: requirement.Requisito.nombre,
            no_copias: requirement.no_copias,
            descripcion: requirement.Requisito.descripcion,
            original: requirement.original,
            complementario: requirement.complementario,
            obligatorio: requirement.obligatorio
        });
    }

    createRequirement() {
        this.loading = true;
        const data = this.requirementsForm.value;
        this.requirementsService.createRecord(data).subscribe({
            next: res => {
                this.loading = false;
                this.initCreateForm();
                this.messagesService.printStatus(res.message, 'success')
                setTimeout(() => {
                    this.getRequirements();
                }, 2500);
            },
            error: err => {
                this.loading = false;
                this.messagesService.printStatus(err.error.errors, 'error');
            }
        });
    }

    updateRequirement() {
        this.loading = true;
        const data = this.requirementsForm.value;
        console.log(data);
        this.requirementsService.updateRecord(data.uuid, data).subscribe({
            next: res => {
                this.loading = false;
                this.initCreateForm();
                this.messagesService.printStatus(res.message, 'success')
                setTimeout(() => {
                    this.getRequirements();
                }, 2500);
            },
            error: err => {
                this.loading = false;
                this.messagesService.printStatus(err.error.errors, 'error');
            }
        });
    }

    getRequirements() {
        const serviceUuid = this.data.serviceUuid;
        this.requirementsService.getRecords(serviceUuid).subscribe({
            next: res => {
                this.dataSource = new MatTableDataSource(res.requerimientos);
                // this.dataSource.paginator = this.paginator;
            },
            error: err => {
                this.messagesService.printStatus(err.error.errors, 'error');
            }
        })
    }


    getDocumentTypes() {
        this.documentTypesService.getRecords().subscribe({
            next: res => {
                this.documentTypes = res.documentos;
            },
            error: err => {
                this.messagesService.printStatus(err.error.errors, 'error');
            }
        })
    }
}
