import {Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {MessageService} from "../../services/messages.service";
import {MatDialog} from "@angular/material/dialog";
import {UsersService} from "../../services/users.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DependenciesService} from "../../services/dependencies.service";
import {MatTableDataSource} from "@angular/material/table";
import {DependenciesModalComponent} from "../../layouts/modals/dependencies-modal/dependencies-modal.component";
import {UsersModalComponent} from "../../layouts/modals/users-modal/users-modal.component";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    public dataSource: any;
    public displayedColumns: string[] = ['nombre', 'apellidos', 'usuario', 'activo', 'accion'];
    public expandedElement: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public usersForm: any;
    public dependencies: any;

    /* Banderas */
    public loading = false;

    constructor(
        private usersService: UsersService,
        private dependenciesService: DependenciesService,
        private messagesService: MessageService,
        private formBuilder: UntypedFormBuilder,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.initCreateForm();
        this.getUsers();
        this.getAreas();
    }

    initCreateForm() {
        this.usersForm = this.formBuilder.group({
            area_uuid: ['Seleccionar dependencia', Validators.required],
            rol: ['Seleccionar rol de usuario', Validators.required],
            nombre: ['', Validators.required],
            apellidos: ['', Validators.required],
            usuario: ['', Validators.required],
            password: ['', Validators.required],
            re_password: ['', Validators.required]
        });
    }

    createUser() {
        this.loading = true;
        const data = this.usersForm.value;
        this.usersService.createRecord(data).subscribe({
            next: res => {
                this.loading = false;
                this.usersForm.reset();
                this.messagesService.printStatus(res.message, 'success');
                setTimeout(() => {
                    this.getUsers()
                }, 2500);
            },
            error: err => {
                this.loading = false;
                this.messagesService.printStatusArrayNew(err.error.errors, 'warning');
            }
        });
    }

    getUsers(){
        this.usersService.getRecords().subscribe({
            next: res => {
                this.dataSource = new MatTableDataSource(res.administradores);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: err => {
                console.log(err);
            }
        })
    }

    getAreas(){
        this.dependenciesService.getRecords().subscribe({
            next: res => {
                this.dependencies = res.areas;
            },
            error: err => {
                console.log(err);
            }
        })
    }

    openUsersDialog(user: any){
        const config = {
            width: '40%',
            data: {
                user
            },
        }

        const dialogRef = this.dialog.open(UsersModalComponent, config);

        dialogRef.afterClosed().subscribe(res => {
            this.getUsers()
        });
    }

}
