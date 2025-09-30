import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {UntypedFormBuilder, Validators} from "@angular/forms";

/* Services */
import {MessagesService} from "src/app/services/messages.service";
import {DocumentTypesService} from "src/app/services/document-types.service";
import {RequerimentsService} from "src/app/services/requeriments.service";
import {NgxSpinnerService} from "ngx-spinner";

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
        private spinner: NgxSpinnerService,
        private documentTypesService: DocumentTypesService,
        private messagesService: MessagesService,
        private formBuilder: UntypedFormBuilder,
        public matDialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.spinner.show();
        this.initCreateForm();
        this.getDocumentTypes();
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
        this.spinner.show();
        const data = this.requirementsForm.value;
        this.requirementsService.createRecord(data).subscribe({
            next: res => {
                this.initCreateForm();
                this.messagesService.printStatus(res.message, 'success')
                setTimeout(() => {
                    this.getRequirements();
                }, 2500);
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        });
    }

    updateRequirement() {
        this.spinner.show();
        const data = this.requirementsForm.value;
        this.requirementsService.updateRecord(data.uuid, data).subscribe({
            next: res => {
                this.initCreateForm();
                this.messagesService.printStatus(res.message, 'success')
                setTimeout(() => {
                    this.getRequirements();
                }, 2500);
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        });
    }

    getRequirements() {
        const serviceUuid = this.data.serviceUuid;
        this.requirementsService.getRequerimentsByService(serviceUuid).subscribe({
            next: res => {
                this.spinner.hide();
                this.dataSource = new MatTableDataSource(res.requerimientos);
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        })
    }


    getDocumentTypes() {
        this.documentTypesService.getRecords().subscribe({
            next: res => {
                this.documentTypes = res.documentos;
                this.getRequirements();
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        })
    }

    deleteRequeriment(requeriment: any){
        this.messagesService.confirmDelete('¿Estás seguro de eliminar este requerimiento?')
            .then((result: any) => {
                if (result.isConfirmed) {
                    this.spinner.show();
                    this.requirementsService.deleteRecord(requeriment.Requisito.uuid).subscribe({
                        next: res => {
                            this.spinner.hide();
                            this.messagesService.printStatus(res.message, 'success');
                            setTimeout(() => {
                                this.getRequirements();
                            }, 2500)
                        },
                        error: err => {
                            this.spinner.hide();
                            this.messagesService.printStatusArrayNew(err.error.errors, 'error');
                        }
                    });
                }
            });
    }
}
