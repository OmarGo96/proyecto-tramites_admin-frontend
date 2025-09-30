import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {RequestsService} from "../../services/requests.service";
import {RequerimentsService} from "../../services/requeriments.service";
import {MessagesService} from "../../services/messages.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {ContribuyentesService} from "../../services/contribuyentes.service";
import {ContribuyentesModalComponent} from "../../layouts/modals/contribuyentes-modal/contribuyentes-modal.component";

@Component({
    selector: 'app-contribuyentes',
    templateUrl: './contribuyentes.component.html',
    styleUrls: ['./contribuyentes.component.css']
})
export class ContribuyentesComponent implements OnInit {

    public dataSource: any;
    public displayedColumns: string[] = ['id', 'name', 'rfc', 'email', 'activo', 'expediente', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private contribuyentesService: ContribuyentesService,
        private messagesService: MessagesService,
        private router: Router,
        private spinner: NgxSpinnerService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.getContribuyentes();
    }

    getContribuyentes() {
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

    getExpediente(contribuyenteUuid: any) {
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

    openEditContribuyenteModal(contribuyente: any){
        const config = {
            width: '50%',
            data: {
                contribuyente
            },
        }

        const dialogRef = this.dialog.open(ContribuyentesModalComponent, config);

        dialogRef.afterClosed().subscribe(res => {
            this.getContribuyentes();
        });
    }

    resendActivationCode(contribuyenteUuid: string){
        this.messagesService.confirmRequest('¿Estás seguro de reenviar el código de activación?')
            .then((result: any) => {
                if (result.isConfirmed) {
                    this.spinner.show();
                    this.contribuyentesService.resentActivationCode(contribuyenteUuid).subscribe({
                        next: res => {
                            this.spinner.hide();
                            this.messagesService.printStatus(res.message, 'success');
                            setTimeout(() => {
                                this.getContribuyentes();
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

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
