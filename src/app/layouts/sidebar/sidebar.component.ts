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
        path: '/solicitudes/nuevas',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Nuevas',
        icon: 'fa-inbox',
        class: ''
    },
    {
        path: '/solicitudes/validacion',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'En validación de documentos',
        icon: 'fa-list-check',
        class: ''
    },
    {
        path: '/solicitudes/pendiente',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Pendiente de documentación',
        icon: 'fa-clock',
        class: ''
    },
    {
        path: '/solicitudes/calificacion',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Calificación de área técnica',
        icon: 'fa-clipboard-check',
        class: ''
    },
    {
        path: '/solicitudes/inspeccion',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'En inspección fisica',
        icon: 'fa-file-invoice',
        class: ''
    },
    {
        path: '/solicitudes/pago',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Pendiente de pago',
        icon: 'fa-cart-shopping',
        class: ''
    },
    {
        path: '/solicitudes/pagado',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Pagado',
        icon: 'fa-money-bill',
        class: ''
    },
    {
        path: '/solicitudes/impresion',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Impresión de documento',
        icon: 'fa-print',
        class: ''
    },
    {
        path: '/solicitudes/firma',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'En firma',
        icon: 'fa-file-pen',
        class: ''
    },
    {
        path: '/solicitudes/digitalizacion',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Digitalización',
        icon: 'fa-laptop-file',
        class: ''
    },
    {
        path: '/solicitudes/ventanilla',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'En ventanilla',
        icon: 'fa-window-restore',
        class: ''
    },
    {
        path: '/solicitudes/entregados',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Entregados',
        icon: 'fa-file-import',
        class: ''
    },
    {
        path: '/solicitudes/prevencion',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Prevención',
        icon: 'fa-triangle-exclamation',
        class: ''
    },
    {
        path: '/solicitudes/cancelados',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Cancelados',
        icon: 'fa-ban',
        class: ''
    },
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
