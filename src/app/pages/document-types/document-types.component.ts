import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "../../services/messages.service";
import {MatDialog} from "@angular/material/dialog";
import {DocumentTypesService} from "../../services/document-types.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
    selector: 'app-document-types',
    templateUrl: './document-types.component.html',
    styleUrls: ['./document-types.component.css']
})
export class DocumentTypesComponent implements OnInit {

    public dataSource: any;
    public displayedColumns: string[] = ['nombre', 'clave', 'aprobacion'];
    public expandedElement: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public documentTypesForm: any;
    public documentTypes: any;
    public loading = false;

    constructor(
        private documentTypesService: DocumentTypesService,
        private messagesService: MessageService,
        private formBuilder: FormBuilder,
        public matDialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.initCreateForm();
        this.getDocumentTypes();
    }

    initCreateForm(){
        this.documentTypesForm = this.formBuilder.group({
            nombre: ['', Validators.required],
            clave: ['', Validators.required],
            descripcion: ['', Validators.required],
            aprobacion: false
        })
    }

    createDocumentType(){
        this.loading = true;
        const data = this.documentTypesForm.value;
        this.documentTypesService.createRecord(data).subscribe({
            next: res => {
                this.loading = false;
                this.documentTypesForm.reset();
                this.messagesService.printStatus(res.message, 'success');
                setTimeout(()=>{
                    this.getDocumentTypes();
                }, 2500);
            },
            error: err => {
                this.loading = false;
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        });
    }

    getDocumentTypes(){
        this.documentTypesService.getRecords().subscribe({
            next: res => {
                this.documentTypes = res.documentos;
                this.dataSource = new MatTableDataSource(res.documentos);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: err => {
                this.loading = false;
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        })
    }

}
