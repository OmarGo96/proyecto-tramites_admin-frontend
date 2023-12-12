import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {RequestsService} from "../../services/requests.service";
import {RequerimentsService} from "../../services/requeriments.service";
import {MessageService} from "../../services/messages.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {ContribuyentesService} from "../../services/contribuyentes.service";

@Component({
    selector: 'app-contribuyentes',
    templateUrl: './contribuyentes.component.html',
    styleUrls: ['./contribuyentes.component.css']
})
export class ContribuyentesComponent implements OnInit {

    public dataSource: any;
    public displayedColumns: string[] = ['id', 'name', 'rfc', 'email', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private contribuyentesService: ContribuyentesService,
        private messagesService: MessageService,
        private router: Router,
        private spinner: NgxSpinnerService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.getContribuyentes();
    }

    getContribuyentes(){
        this.spinner.show();
        this.contribuyentesService.getContribuyentes().subscribe({
            next: res => {
                console.log(res.contribuyentes);
                this.spinner.hide();
                this.dataSource = new MatTableDataSource(res.contribuyentes);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: err => {
                console.log(err);
            }
        });
    }

    getExpediente(contribuyenteUuid: any){
        this.spinner.show();
        this.contribuyentesService.getExpedienteContribuyente(contribuyenteUuid).subscribe({
            next: res => {
                this.spinner.hide();
                let url = URL.createObjectURL(res);
                window.open(url, '_blank');
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.printStatus('Hubo un problema al descargar el archivo. Intente nuevamente', 'error');
            }
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
