import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, UntypedFormBuilder, Validators} from "@angular/forms";
import {MessagesService} from "../../services/messages.service";
import {MatDialog} from "@angular/material/dialog";
import {DocumentTypesService} from "../../services/document-types.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {NgxSpinnerService} from "ngx-spinner";
import {DependenciesModalComponent} from "../../layouts/modals/dependencies-modal/dependencies-modal.component";
import {EditDocumentsComponent} from "../../layouts/modals/edit-documents/edit-documents.component";

@Component({
    selector: 'app-document-types',
    templateUrl: './document-types.component.html',
    styleUrls: ['./document-types.component.css']
})
export class DocumentTypesComponent implements OnInit {

    public dataSource: any;
    public displayedColumns: string[] = ['nombre', 'aprobacion', 'expediente', 'editar'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public documentTypesForm: any;
    public documentTypes: any;

    constructor(
        private documentTypesService: DocumentTypesService,
        private messagesService: MessagesService,
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

    editDocument(documentType: any){
        const config = {
            data: {
                document: documentType
            }
        }

        const dialogRef = this.matDialog.open(EditDocumentsComponent, config);

        dialogRef.afterClosed().subscribe((result: any) => {
            this.getDocumentTypes();
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
