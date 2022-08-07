import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ServicesService} from "../../../services/services.service";
import {MessageService} from "../../../services/messages.service";
import {DependenciesModalComponent} from "../../../layouts/modals/dependencies-modal/dependencies-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {UploadModalComponent} from "../../../layouts/modals/upload-modal/upload-modal.component";
import {ServicesModalComponent} from "../../../layouts/modals/services-modal/services-modal.component";

@Component({
    selector: 'app-services-detail',
    templateUrl: './services-detail.component.html',
    styleUrls: ['./services-detail.component.css']
})
export class ServicesDetailComponent implements OnInit {

    public service: any;
    public document: any;
    public serviceUuid: any;

    constructor(
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
                this.getService(res['uuid']);
                this.serviceUuid = res['uuid'];
            },
            error: err => {
                console.log(err);
            }
        });
    }

    getService(uuid: any) {
        this.servicesService.getRecord(uuid).subscribe({
            next: res => {
                this.service = res.servicio;
            },
            error: err => {
                this.messagesService.printStatusArrayNew(err.error.errors, 'error');
            }
        });
    }

    getDocument() {
        const uuid = this.serviceUuid;
        this.servicesService.getDocument(uuid).subscribe({
            next: res => {
                let url = URL.createObjectURL(res);
                window.open(url, '_blank');
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
                serviceUuid: this.serviceUuid
            },
        }

        const dialogRef = this.dialog.open(UploadModalComponent, config);

        dialogRef.afterClosed().subscribe(res => {
            this.getUuid();
        });
    }

    openDialogEdit(): void {
        const config = {
            width: '50%',
            data: {
                service: this.service
            },
        }

        const dialogRef = this.dialog.open(ServicesModalComponent, config);

        dialogRef.afterClosed().subscribe(res => {
            this.getUuid();
        });
    }

}
