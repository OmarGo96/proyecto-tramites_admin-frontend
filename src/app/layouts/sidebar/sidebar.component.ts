import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    public singleMenuItems: any;
    public dropdownMenu = false;
    public groupMenuItems: any;

    constructor() {
    }

    ngOnInit(): void {
        this.sideBarMenu();
    }

    sideBarMenu(): void {
        const routes = ROUTES;
        this.groupMenuItems = [];

        const groupItems = new Set(routes.map((item: any) => item.group));
        this.singleMenuItems = routes.filter((item: any) => !item.group);

        groupItems.forEach((item: any) =>
            this.groupMenuItems.push({
                    name: item,
                    values: routes.filter((i: any) => i.group === item)
                }
            ));

        for (let i = 0; i < this.groupMenuItems.length; i++) {
            for (let j = 0; j < this.groupMenuItems[i].values.length; j++) {
                this.groupMenuItems[i].module = this.groupMenuItems[i].values[j].module;
                this.groupMenuItems[i].icon = this.groupMenuItems[i].values[j].icon;
            }
        }
    }

    openDropdownMenu() {
        this.dropdownMenu = !this.dropdownMenu;
    }

}

export const ROUTES = [
    {
        path: '/solicitudes',
        group: 'Solicitudes',
        module: 'solicitudes',
        title: 'Ver todas',
        icon: 'folder',
        class: ''
    },
    {path: '/dependencias', module: 'dependencias', title: 'Dependencias', icon: 'business', class: ''},
    {path: '/usuarios', module: 'usuarios', title: 'Usuarios', icon: 'people', class: ''},
    {path: '/documentos', module: 'documentos', title: 'Tipo de Documentos', icon: 'description', class: ''}
];
