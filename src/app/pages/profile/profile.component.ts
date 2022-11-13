import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public files: File[] = [];
    public profile: any;

    /* Banderas */
    public loading: any;

    constructor(
        private usersService: UsersService
    ) {
    }

    ngOnInit(): void {
        this.profile = this.usersService.getIdentity();
        console.log(this.profile);
    }

    uploadFiles() {

    }

    onSelect(event: any) {
        this.files.push(...event.addedFiles);
    }

    onRemove(event: any) {
        this.files.splice(this.files.indexOf(event), 1);
    }

}
