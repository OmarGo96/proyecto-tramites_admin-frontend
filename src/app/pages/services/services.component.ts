import {Component, OnInit, ViewChild} from '@angular/core';
import {DependenciesModalComponent} from "../../layouts/modals/dependencies-modal/dependencies-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {DependenciesService} from "../../services/dependencies.service";
import {MessageService} from "../../services/messages.service";
import {ServicesModalComponent} from "../../layouts/modals/services-modal/services-modal.component";
import {ServicesService} from "../../services/services.service";
import {RequirementsModalComponent} from "../../layouts/modals/requirements-modal/requirements-modal.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {NgxSpinnerService} from "ngx-spinner";
import {
    LinkRequerimentsModalComponent
} from "../../layouts/modals/requeriments/link-requeriments-modal/link-requeriments-modal.component";

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

    public direction: any;
    public services: any;

    public dataSource: any;
    public displayedColumns: string[] = ['tramite', 'costo', 'requisitos', 'accion'];
    public expandedElement: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private dependenciesService: DependenciesService,
        private servicesService: ServicesService,
        private messagesService: MessageService,
        private activatedRoute: ActivatedRoute,
        private spinner: NgxSpinnerService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.spinner.show();
        this.getUuid();
    }

    getUuid() {
        this.activatedRoute.params.subscribe({
            next: res => {
                this.getDirection(res['uuid']);
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(['Ocurrio un error al obtener el identificador del area']);
            }
        });
    }

    getDirection(uuid: any) {
        this.dependenciesService.getRecord(uuid).subscribe({
            next: res => {
                this.direction = res.area;
                this.getServicesByArea(res.area.uuid);
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        });
    }

    getServicesByArea(uuid: any) {
        this.servicesService.getServices(uuid).subscribe({
            next: res => {
                this.spinner.hide();
                this.services = res.servicios;
                this.dataSource = new MatTableDataSource(res.servicios);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        });
    }

    openDialog(): void {
        const config = {
            width: '50%',
            data: {
                areaUuid: this.direction.uuid
            },
        }

        const dialogRef = this.dialog.open(ServicesModalComponent, config);

        dialogRef.afterClosed().subscribe(res => {
            this.getUuid();
        });
    }

    openRequirementsDialog(service: any): void {
        const config = {
            width: '100%',
            data: {
                service
            },
        }

        const dialogRef = this.dialog.open(LinkRequerimentsModalComponent, config);

        dialogRef.afterClosed().subscribe(res => {
            this.getUuid();
        });
    }
}
