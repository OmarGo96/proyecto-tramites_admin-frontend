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

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

    public direction: any;
    public services: any;

    public dataSource: any;
    public displayedColumns: string[] = ['tramite', 'requisitos', 'costo', 'accion'];
    public expandedElement: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private dependenciesService: DependenciesService,
        private servicesService: ServicesService,
        private messagesService: MessageService,
        private activatedRoute: ActivatedRoute,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.getUuid();
    }

    getUuid() {
        this.activatedRoute.params.subscribe({
            next: res => {
                this.getDirection(res['uuid']);
            },
            error: err => {
                console.log(err);
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
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        });
    }

    getServicesByArea(uuid: any) {
        this.servicesService.getServices(uuid).subscribe({
            next: res => {
                this.services = res.servicios;
                this.dataSource = new MatTableDataSource(res.servicios);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: err => {
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
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
            console.log('The dialog was closed');
        });
    }

    openRequirementsDialog(serviceUuid: any): void {
        const config = {
            width: '100%',
            data: {
                serviceUuid
            },
        }

        const dialogRef = this.dialog.open(RequirementsModalComponent, config);

        dialogRef.afterClosed().subscribe(res => {
            console.log('The dialog was closed');
        });
    }
}
