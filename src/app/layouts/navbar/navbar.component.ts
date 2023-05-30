import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    public dependency: any;

    constructor(
        public usersService: UsersService
    ) {
    }

    ngOnInit(): void {
        this.dependency = sessionStorage.getItem('dependencia');
    }

    logout(): void {
        this.usersService.logout();
    }

}
