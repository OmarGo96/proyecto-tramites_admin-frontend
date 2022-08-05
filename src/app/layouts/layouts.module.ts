import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {ModalsComponent} from './modals/modals.component';
import {BaseComponent} from './base/base.component';
import {DependenciesModalComponent} from './modals/dependencies-modal/dependencies-modal.component';
import { ServicesModalComponent } from './modals/services-modal/services-modal.component';
import { RequirementsModalComponent } from './modals/requirements-modal/requirements-modal.component';
import {ExcerptPipe} from 'src/app/pipes/excerpt.pipe';
import { UploadModalComponent } from './modals/upload-modal/upload-modal.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import { RequestHistoryModalComponent } from './modals/request-history-modal/request-history-modal.component';
import { MessagesModalComponent } from './modals/messages-modal/messages-modal.component';

@NgModule({
    declarations: [
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        ModalsComponent,
        BaseComponent,
        DependenciesModalComponent,
        ServicesModalComponent,
        RequirementsModalComponent,
        ExcerptPipe,
        UploadModalComponent,
        RequestHistoryModalComponent,
        MessagesModalComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        NgxDropzoneModule
    ],
    exports: [
        ExcerptPipe
    ],
})
export class LayoutsModule {
}
