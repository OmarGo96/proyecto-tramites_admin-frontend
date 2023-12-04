import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {MaterialModule} from "../material/material.module";
import {DependenciesComponent} from './dependencies/dependencies.component';
import {ServicesComponent} from './services/services.component';
import { DocumentTypesComponent } from './document-types/document-types.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ServicesDetailComponent } from './services/services-detail/services-detail.component';
import { ProfileComponent } from './profile/profile.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import { UsersComponent } from './users/users.component';
import { RequestsComponent } from './requests/all-requests/requests.component';
import { RequerimentsComponent } from './requeriments/requeriments.component';
import { ContribuyentesComponent } from './contribuyentes/contribuyentes.component';

const routes: Routes = [

    {
        path: 'solicitudes',
        children: [
            {
                path: '',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../pages/requests/requests.module').then(m => m.RequestsModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: 'solicitudes/nuevas',
                pathMatch: 'full'
            }
        ]
    },
    {path: 'dependencias', component: DependenciesComponent},
    {path: 'contribuyentes', component: ContribuyentesComponent},
    {path: 'requisitos', component: RequerimentsComponent},
    {path: 'tramites/:uuid', component: ServicesComponent},
    {path: 'servicio/:uuid', component: ServicesDetailComponent},
    {path: 'usuarios', component: UsersComponent},
    {path: 'documentos', component: DocumentTypesComponent},
    {path: 'perfil', component: ProfileComponent}
]

@NgModule({
    declarations: [
        HomeComponent,
        DependenciesComponent,
        ServicesComponent,
        DocumentTypesComponent,
        ServicesDetailComponent,
        ProfileComponent,
        UsersComponent,
        RequestsComponent,
        RequerimentsComponent,
        ContribuyentesComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NgxDropzoneModule
    ]
})
export class PagesModule {
}
