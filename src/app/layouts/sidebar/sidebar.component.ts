import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    public menuItems: any;
    public menu: any;
    public user: any;

    constructor(
        private usersService: UsersService
    ) {
    }

    ngOnInit(): void {
        this.user = this.usersService.getIdentity();
        this.setMenuItem();
    }

    setMenuItem(){
        this.menuItems = ROUTES.filter(menuItem => menuItem);

        const groups = new Set(this.menuItems.map((item: any) => item.group));

        this.menu = [];
        groups.forEach(g =>
            this.menu.push({
                    name: g,
                    values: this.menuItems.filter((i: any) => i.group === g),
                    module: ''
                }
            ));

        for (let i = 0; i < this.menu.length; i++) {
            for (let j = 0; j < this.menu[i].values.length; j++) {
                this.menu[i].module = this.menu[i].values[j].module;
            }
        }
    }

    logout(): void {
        this.usersService.logout();
    }


}


export const ROUTES = [
    {
        path: '/solicitudes',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Ver solicitudes',
        icon: 'fa-inbox',
        class: ''
    },
    /*{
        path: '/solicitudes',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Aceptadas',
        icon: 'fa-inbox',
        class: ''
    },
    {
        path: '/solicitudes',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'En validación de documentos',
        icon: 'fa-inbox',
        class: ''
    },
    {
        path: '/solicitudes',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Pendiente de documentación',
        icon: 'fa-inbox',
        class: ''
    },
    {
        path: '/solicitudes',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Calificación de área técnica',
        icon: 'fa-inbox',
        class: ''
    },
    {
        path: '/solicitudes',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'En inspección fisica',
        icon: 'fa-inbox',
        class: ''
    },*/
    {
        path: '/dependencias',
        group: 'ADMINISTRACIÓN',
        module: 'dependencias',
        action: 'list',
        title: 'Dependencias',
        icon: 'fa-building-flag',
        class: ''
    },
    {
        path: '/usuarios',
        group: 'ADMINISTRACIÓN',
        module: 'usuarios',
        action: 'list',
        title: 'Usuarios',
        icon: 'fa-users',
        class: ''
    },
    {
        path: '/documentos',
        group: 'ADMINISTRACIÓN',
        module: 'documentos',
        action: 'list',
        title: 'Tipo de Documentos',
        icon: 'fa-file-export',
        class: ''
    }
];
