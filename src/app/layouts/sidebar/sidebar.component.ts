import {AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {RequestsService} from "../../services/requests.service";
import {RequestsStatus} from "../../const/status";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    public menuItems: any;
    public menu: any;
    public user: any;

    @Input() badges: any;

    public statuses = RequestsStatus;

    constructor(
        private usersService: UsersService,
        private requestsService: RequestsService,
    ) {
    }

    ngOnInit(): void {
        this.user = this.usersService.getIdentity();
        this.setMenuItem();
        // this.getBadges();
    }

    getBadges(){
        this.requestsService.getBadges().subscribe({
            next: res => {
                this.badges = res.badges;
            },
            error: err => {
                console.log(err);
            }
        });
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
        id: 2,
        path: '/solicitudes/nuevas',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Nuevas',
        icon: 'fa-inbox',
        class: ''
    },
    {
        id: 12,
        path: '/solicitudes/validacion',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Valid. de documentos',
        icon: 'fa-list-check',
        class: ''
    },
    {
        id: 5,
        path: '/solicitudes/pendiente',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Pend. documentación',
        icon: 'fa-clock',
        class: ''
    },
    {
        id: 14,
        path: '/solicitudes/calificacion',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Área técnica',
        icon: 'fa-clipboard-check',
        class: ''
    },
    {
        id: 15,
        path: '/solicitudes/inspeccion',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'En inspección fisica',
        icon: 'fa-file-invoice',
        class: ''
    },
    {
        id: 26,
        path: '/solicitudes/pase-caja',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Generación pase a caja',
        icon: 'fa-receipt',
        class: ''
    },
    {
        id: 10,
        path: '/solicitudes/pago',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Pendiente de pago',
        icon: 'fa-cart-shopping',
        class: ''
    },
    {
        id: 20,
        path: '/solicitudes/validacion-pago',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Validación de pago',
        icon: 'fa-comment-dollar',
        class: ''
    },
    {
        id: 21,
        path: '/solicitudes/doc-pendiente',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Pend. doc. pago',
        icon: 'fa-clock',
        class: ''
    },
    {
        id: 11,
        path: '/solicitudes/pagado',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Pagado',
        icon: 'fa-money-bill',
        class: ''
    },
    {
        id: 22,
        path: '/solicitudes/pendiente-anuencia',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Pend. anuencia prot. civil',
        icon: 'fa-fire-extinguisher',
        class: ''
    },
    {
        id: 23,
        path: '/solicitudes/validacion-anuencia',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Validación de anuencia',
        icon: 'fa-person-circle-check',
        class: ''
    },
    {
        id: 24,
        path: '/solicitudes/documentacion-complementaria',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Documentación complementaria',
        icon: 'fa-file',
        class: ''
    },
    {
        id: 25,
        path: '/solicitudes/validacion-documentacion-complementaria',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Val. de doc. complementaria',
        icon: 'fa-file-circle-check',
        class: ''
    },
    {
        id: 19,
        path: '/solicitudes/elaboracion',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Elaboración documento',
        icon: 'fa-file-waveform',
        class: ''
    },
    {
        id: 16,
        path: '/solicitudes/impresion',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Impresión de documento',
        icon: 'fa-print',
        class: ''
    },
    {
        id: 8,
        path: '/solicitudes/firma',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'En firma',
        icon: 'fa-file-pen',
        class: ''
    },
    {
        id: 17,
        path: '/solicitudes/digitalizacion',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Digitalización',
        icon: 'fa-laptop-file',
        class: ''
    },
    {
        id: 9,
        path: '/solicitudes/ventanilla',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'En ventanilla',
        icon: 'fa-window-restore',
        class: ''
    },
    {
        id: 18,
        path: '/solicitudes/entregados',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Entregados',
        icon: 'fa-file-import',
        class: ''
    },
    {
        id: 6,
        path: '/solicitudes/prevencion',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Prevención',
        icon: 'fa-triangle-exclamation',
        class: ''
    },
    {
        id: 7,
        path: '/solicitudes/cancelados',
        group: 'SOLICITUDES',
        module: 'solicitudes',
        action: 'list',
        title: 'Cancelados',
        icon: 'fa-ban',
        class: ''
    },
    {
        id: null,
        path: '/dependencias',
        group: 'ADMINISTRACIÓN',
        module: 'dependencias',
        action: 'list',
        title: 'Dependencias',
        icon: 'fa-building-flag',
        class: ''
    },
    {
        id: null,
        path: '/requisitos',
        group: 'ADMINISTRACIÓN',
        module: 'requisitos',
        action: 'list',
        title: 'Requisitos',
        icon: 'fa-list-check',
        class: ''
    },
    {
        id: null,
        path: '/usuarios',
        group: 'ADMINISTRACIÓN',
        module: 'usuarios',
        action: 'list',
        title: 'Usuarios',
        icon: 'fa-users',
        class: ''
    },
    {
        id: null,
        path: '/documentos',
        group: 'ADMINISTRACIÓN',
        module: 'documentos',
        action: 'list',
        title: 'Tipo de Documentos',
        icon: 'fa-file-export',
        class: ''
    }
];
