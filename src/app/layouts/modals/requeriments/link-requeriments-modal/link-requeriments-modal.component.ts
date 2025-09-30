import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {RequerimentsService} from "../../../../services/requeriments.service";
import {MessagesService} from "../../../../services/messages.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MatSelect} from "@angular/material/select";
import {RequestsStatus} from "../../../../const/status";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder} from "@angular/forms";

@Component({
    selector: 'app-link-requeriments-modal',
    templateUrl: './link-requeriments-modal.component.html',
    styleUrls: ['./link-requeriments-modal.component.css']
})
export class LinkRequerimentsModalComponent implements OnInit {

    public assignRequerimentForm: any;
    public updateRequerimentForm: any;

    public requeriments: any;

    public service: any

    public dataSource: any;
    public displayedColumns: string[] = ['nombre', 'obligatorio', 'original', 'no_copias', 'fecha_alta', 'accion'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @ViewChild('singleSelect', {static: true}) singleSelect: MatSelect;

    public editingRequeriment: boolean;
    public requerimientoServicioId: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private requerimentsService: RequerimentsService,
        private formBuilder: FormBuilder,
        private messagesService: MessagesService,
        private router: Router,
        private spinner: NgxSpinnerService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.service = this.data.service;
        this.getRequeriments();
        this.initAssignRequerimentForm();
        this.getRequerimentsByService();
    }

    initAssignRequerimentForm() {
        this.assignRequerimentForm = this.formBuilder.group({
            servicio_uuid: [this.service.uuid],
            requisito_id: [''],
            no_copias: [''],
            original: [''],
            obligatorio: ['']
        });
    }

    initUpdateRequerimentForm(requeriment: any){
        console.log(requeriment);
        this.requerimientoServicioId = requeriment.id;
        this.updateRequerimentForm = this.formBuilder.group({
            servicio_uuid: [this.service.uuid],
            requisito_id: [{value: requeriment.Requisito.id, disabled: true}],
            no_copias: [requeriment.no_copias],
            original: [requeriment.original.toString()],
            obligatorio: [requeriment.obligatorio.toString()]
        });

    }

    getRequerimentsByService() {
        this.spinner.show();
        this.requerimentsService.getRequerimentsByService(this.service.uuid).subscribe({
            next: res => {
                this.spinner.hide();
                this.dataSource = new MatTableDataSource(res.requerimientos);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        });
    }

    assignRequeriment() {
        this.spinner.show();
        const data = this.assignRequerimentForm.value;
        console.log(data);
        this.requerimentsService.assignRequeriment(data).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success');
                this.getRequerimentsByService();
                this.initAssignRequerimentForm();
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        });
    }

    updateRequeriment(){
        this.spinner.show();
        const data = this.updateRequerimentForm.value;
        this.requerimentsService.updateRequeriment(this.requerimientoServicioId, data).subscribe({
            next: res => {
                this.spinner.hide();
                this.messagesService.printStatus(res.message, 'success');
                this.getRequerimentsByService();
                this.initAssignRequerimentForm()
                this.updateRequerimentForm = false;
                this.updateRequerimentForm.reset()
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        });
    }

    unlinkRequeriment(requeriment: any) {
        this.messagesService.confirmDelete('¿Estás seguro de devincular este requisito?')
            .then((result: any) => {
                if (result.isConfirmed) {
                    this.spinner.show();
                    this.requerimientoServicioId = requeriment.id;
                    this.requerimentsService.unlinkRequeriment(this.requerimientoServicioId).subscribe({
                        next: res => {
                            this.spinner.hide();
                            this.messagesService.printStatus(res.message, 'success');
                            this.getRequerimentsByService();
                        },
                        error: err => {
                            this.spinner.hide();
                            this.messagesService.errorAlert(err.error.errors);
                        }
                    });
                }
            });
    }


    getRequeriments() {
        this.spinner.show();
        this.requerimentsService.getRequeriments().subscribe({
            next: res => {
                this.spinner.hide();
                this.requeriments = res.requerimientos;
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        });
    }
}
