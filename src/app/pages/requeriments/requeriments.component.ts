import {Component, OnInit, ViewChild} from '@angular/core';
import {RequestsStatus} from "../../const/status";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {RequestsService} from "../../services/requests.service";
import {MessageService} from "../../services/messages.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
    selector: 'app-requeriments',
    templateUrl: './requeriments.component.html',
    styleUrls: ['./requeriments.component.css']
})
export class RequerimentsComponent implements OnInit {

    public dataSource: any;
    public displayedColumns: string[] = ['folio', 'tramite', 'creado', 'estatus', 'accion'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public statuses = RequestsStatus;

    constructor(
        private requestsService: RequestsService,
        private messagesService: MessageService,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {
    }

    ngOnInit(): void {
    }

    applyFilter(event: Event) {
       /* const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();*/
    }

    protected readonly RequestsStatus = RequestsStatus;
}
