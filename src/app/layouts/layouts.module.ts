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
import { UsersModalComponent } from './modals/users-modal/users-modal.component';
import { CreateRequerimentsModalComponent } from './modals/requeriments/create-requeriments-modal/create-requeriments-modal.component';
import { UpdateRequerimentsModalComponent } from './modals/requeriments/update-requeriments-modal/update-requeriments-modal.component';
import {
    LinkRequerimentsModalComponent
} from "./modals/requeriments/link-requeriments-modal/link-requeriments-modal.component";
import {NgSelectModule} from "@ng-select/ng-select";
import { EditDocumentsComponent } from './modals/edit-documents/edit-documents.component';
import { ContribuyentesModalComponent } from './modals/contribuyentes-modal/contribuyentes-modal.component';
import { AsignarLicenciaModalComponent } from './modals/asignar-licencia-modal/asignar-licencia-modal.component';

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
        MessagesModalComponent,
        UsersModalComponent,
        CreateRequerimentsModalComponent,
        UpdateRequerimentsModalComponent,
        LinkRequerimentsModalComponent,
        EditDocumentsComponent,
        ContribuyentesModalComponent,
        AsignarLicenciaModalComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        NgxDropzoneModule,
        NgSelectModule
    ],
    exports: [
        ExcerptPipe,
        NavbarComponent
    ],
})
export class LayoutsModule {
}
