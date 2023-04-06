import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SentRequestsComponent} from "./sent-requests/sent-requests.component";
import {RequestsValidationComponent} from "./requests-validation/requests-validation.component";
import {PendingRequestsComponent} from "./pending-requests/pending-requests.component";
import {QualificationRequestsComponent} from "./qualification-requests/qualification-requests.component";
import {InspectionRequestsComponent} from "./inspection-requests/inspection-requests.component";
import {PaymentRequestsComponent} from "./payment-requests/payment-requests.component";
import {PaymentValidateComponent} from "./payment-validate/payment-validate.component";
import {PaidRequestsComponent} from "./paid-requests/paid-requests.component";
import {PrintingRequestsComponent} from "./printing-requests/printing-requests.component";
import {SigningRequestsComponent} from "./signing-requests/signing-requests.component";
import {DigitizationRequestsComponent} from "./digitization-requests/digitization-requests.component";
import {ToDeliverRequestsComponent} from "./to-deliver-requests/to-deliver-requests.component";
import {PreventRequestsComponent} from "./prevent-requests/prevent-requests.component";
import {CancelledRequestsComponent} from "./cancelled-requests/cancelled-requests.component";
import {DeliveredRequestsComponent} from "./delivered-requests/delivered-requests.component";
import {RouterModule, Routes} from "@angular/router";
import {LayoutsModule} from "../../layouts/layouts.module";
import {RequestDetailComponent} from "./request-detail/request-detail.component";
import {MaterialModule} from "../../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
    {
        path: 'nuevas', component: SentRequestsComponent,

    },
    {path: 'validacion', component: RequestsValidationComponent},
    {path: 'pendiente', component: PendingRequestsComponent},
    {path: 'calificacion', component: QualificationRequestsComponent},
    {path: 'inspeccion', component: InspectionRequestsComponent},
    {path: 'pago', component: PaymentRequestsComponent},
    {path: 'validacion-pago', component: PaymentValidateComponent},
    {path: 'pagado', component: PaidRequestsComponent},
    {path: 'impresion', component: PrintingRequestsComponent},
    {path: 'firma', component: SigningRequestsComponent},
    {path: 'digitalizacion', component: DigitizationRequestsComponent},
    {path: 'ventanilla', component: ToDeliverRequestsComponent},
    {path: 'entregados', component: DeliveredRequestsComponent},
    {path: 'prevencion', component: PreventRequestsComponent},
    {path: 'cancelados', component: CancelledRequestsComponent},
    {path: ':type/:id', component: RequestDetailComponent},
    {
        path: '',
        redirectTo: 'nuevas',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        SentRequestsComponent,
        RequestsValidationComponent,
        PendingRequestsComponent,
        QualificationRequestsComponent,
        InspectionRequestsComponent,
        PaymentRequestsComponent,
        PaymentValidateComponent,
        PaidRequestsComponent,
        PrintingRequestsComponent,
        SigningRequestsComponent,
        DigitizationRequestsComponent,
        ToDeliverRequestsComponent,
        DeliveredRequestsComponent,
        PreventRequestsComponent,
        CancelledRequestsComponent,
        RequestDetailComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        LayoutsModule
    ]
})
export class RequestsModule {
}
