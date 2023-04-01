import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(
        private usersService: UsersService
    ) {
    }

    ngOnInit(): void {
    }

    logout(): void {
        this.usersService.logout();
    }

}
