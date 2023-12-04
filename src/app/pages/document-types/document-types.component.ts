import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, UntypedFormBuilder, Validators} from "@angular/forms";
import {MessageService} from "../../services/messages.service";
import {MatDialog} from "@angular/material/dialog";
import {DocumentTypesService} from "../../services/document-types.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
    selector: 'app-document-types',
    templateUrl: './document-types.component.html',
    styleUrls: ['./document-types.component.css']
})
export class DocumentTypesComponent implements OnInit {

    public dataSource: any;
    public displayedColumns: string[] = ['nombre', 'clave', 'aprobacion'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public documentTypesForm: any;
    public documentTypes: any;

    constructor(
        private documentTypesService: DocumentTypesService,
        private messagesService: MessageService,
        private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        public matDialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.spinner.show();
        this.initCreateForm();
        this.getDocumentTypes();
    }

    initCreateForm(){
        this.documentTypesForm = this.formBuilder.group({
            nombre: ['', Validators.required],
            clave: ['', Validators.required],
            descripcion: ['', Validators.required],
            aprobacion: false,
            expediente: false
        })
    }

    createDocumentType(){
        this.spinner.show();
        const data = this.documentTypesForm.value;
        this.documentTypesService.createRecord(data).subscribe({
            next: res => {
                this.documentTypesForm.reset();
                this.documentTypesForm.markAsUntouched();
                Object.keys(this.documentTypesForm.controls).forEach((name) => {
                    this.documentTypesForm.controls[name].setErrors(null);
                });
                this.messagesService.printStatus(res.message, 'success');
                setTimeout(()=>{
                    this.getDocumentTypes();
                }, 2500);
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        });
    }

    getDocumentTypes(){
        this.documentTypesService.getRecords().subscribe({
            next: res => {
                this.spinner.hide();
                this.documentTypes = res.documentos;
                this.dataSource = new MatTableDataSource(res.documentos);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        })
    }

}
