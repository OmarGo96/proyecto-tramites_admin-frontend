import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MessagesService} from "../../services/messages.service";
import {MatDialog} from "@angular/material/dialog";
import {UsersService} from "../../services/users.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DependenciesService} from "../../services/dependencies.service";
import {MatTableDataSource} from "@angular/material/table";
import {UsersModalComponent} from "../../layouts/modals/users-modal/users-modal.component";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    public dataSource: any;
    public displayedColumns: string[] = ['nombre', 'apellidos', 'usuario', 'activo', 'accion'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public usersForm: any;
    public dependencies: any;

    public rol: any;

    constructor(
        private usersService: UsersService,
        private dependenciesService: DependenciesService,
        private messagesService: MessagesService,
        private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        public dialog: MatDialog,
    ) {
    }

    async ngOnInit() {
        this.rol = this.usersService.getRol();
        this.initCreateForm();
        await this.getAreas();
        this.getUsers();
    }

    initCreateForm() {
        this.usersForm = this.formBuilder.group({
            area_uuid: ['', Validators.required],
            role: ['', Validators.required],
            nombre: ['', Validators.required],
            apellidos: ['', Validators.required],
            usuario: ['', Validators.required],
            password: ['', Validators.required],
            re_password: ['', Validators.required]
        });
    }

    createUser() {
        this.spinner.show();
        const data = this.usersForm.value;
        this.usersService.createRecord(data).subscribe({
            next: res => {
                this.spinner.hide();
                this.usersForm.reset();
                this.usersForm.markAsUntouched();
                Object.keys(this.usersForm.controls).forEach((name) => {
                    this.usersForm.controls[name].setErrors(null);
                });
                this.messagesService.printStatus(res.message, 'success');
                setTimeout(() => {
                    location.reload();
                }, 2500);
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        });
    }

    getAreas(){
        this.spinner.show();
        this.dependenciesService.getRecords().subscribe({
            next: res => {
                this.dependencies = res.areas;
            },
            error: err => {
                this.spinner.hide();
                this.messagesService.errorAlert(err.error.errors);
            }
        })
    }

    getUsers(){
        this.usersService.getRecords().subscribe({
            next: res => {
                this.dataSource = new MatTableDataSource(res.administradores);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.spinner.hide();
            },
            error: err => {
                console.log(err);
                // this.spinner.hide();
                // this.messagesService.errorAlert(err.error.errors);
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

    deleteUser(userUuid: any){
        this.messagesService.confirmDelete('¿Estás seguro de eliminar este usuario?')
            .then((result: any) => {
                if (result.isConfirmed) {
                    this.spinner.show();
                    this.usersService.deleteUser(userUuid).subscribe({
                        next: res => {
                            this.spinner.hide();
                            this.messagesService.printStatus(res.message, 'success');
                            setTimeout(() => {
                                this.getUsers();
                            }, 2500);
                        },
                        error: err => {
                            this.spinner.hide();
                            this.messagesService.errorAlert(err.error.errors);
                        }
                    })
                }
             });
    }

}
