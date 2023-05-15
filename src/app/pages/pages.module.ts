import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {MaterialModule} from "../material/material.module";
import {DependenciesComponent} from './dependencies/dependencies.component';
import {ServicesComponent} from './services/services.component';
import {LoginComponent} from "./auth/login/login.component";
import { DocumentTypesComponent } from './document-types/document-types.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ServicesDetailComponent } from './services/services-detail/services-detail.component';
import { ProfileComponent } from './profile/profile.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import { UsersComponent } from './users/users.component';
import { RequestsComponent } from './requests/all-requests/requests.component';
import { RequestDetailComponent } from './requests/request-detail/request-detail.component';
import { SentRequestsComponent } from './requests/sent-requests/sent-requests.component';
import { RequestsValidationComponent } from './requests/requests-validation/requests-validation.component';
import { PendingRequestsComponent } from './requests/pending-requests/pending-requests.component';
import { QualificationRequestsComponent } from './requests/qualification-requests/qualification-requests.component';
import { InspectionRequestsComponent } from './requests/inspection-requests/inspection-requests.component';
import { PaymentRequestsComponent } from './requests/payment-requests/payment-requests.component';
import { PaidRequestsComponent } from './requests/paid-requests/paid-requests.component';
import { PrintingRequestsComponent } from './requests/printing-requests/printing-requests.component';
import { SigningRequestsComponent } from './requests/signing-requests/signing-requests.component';
import { DigitizationRequestsComponent } from './requests/digitization-requests/digitization-requests.component';
import { ToDeliverRequestsComponent } from './requests/to-deliver-requests/to-deliver-requests.component';
import { DeliveredRequestsComponent } from './requests/delivered-requests/delivered-requests.component';
import { PreventRequestsComponent } from './requests/prevent-requests/prevent-requests.component';
import { CancelledRequestsComponent } from './requests/cancelled-requests/cancelled-requests.component';
import { PaymentValidateComponent } from './requests/payment-validate/payment-validate.component';
import { RequerimentsComponent } from './requeriments/requeriments.component';

const routes: Routes = [

    {
        path: 'solicitudes',
        // canActivate: [AuthGuard],
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
        RequerimentsComponent
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
