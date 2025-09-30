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
import {LayoutsModule} from "../../layouts/layouts.module";
import {RequestDetailComponent} from "./request-detail/request-detail.component";
import {MaterialModule} from "../../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import { ElaborationRequestsComponent } from './elaboration-requests/elaboration-requests.component';
import { PendingPaymentDocRequestsComponent } from './pending-payment-doc-requests/pending-payment-doc-requests.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import { ConsentGenerationComponent } from './consent-generation/consent-generation.component';
import { ConsentValidationComponent } from './consent-validation/consent-validation.component';
import { ComplementaryDocsRequestComponent } from './complementary-docs-request/complementary-docs-request.component';
import { ComplementaryDocsValidationComponent } from './complementary-docs-validation/complementary-docs-validation.component';
import { CheckoutGenerationComponent } from './checkout-generation/checkout-generation.component';
import {CurrencyMaskModule} from "ng2-currency-mask";
import { GeneralRequestsComponent } from './general-requests/general-requests.component';
import {PredialFormComponent} from "./components/forms/predial-form/predial-form.component";
import {RouterModule, Routes} from "@angular/router";
import { AddLicenciaFuncionamientoFormComponent } from './components/forms/add-licencia-funcionamiento-form/add-licencia-funcionamiento-form.component';

const routes: Routes = [
    {path: 'todas', component: GeneralRequestsComponent},
    {path: 'nuevas', component: SentRequestsComponent},
    {path: 'validacion', component: RequestsValidationComponent},
    {path: 'pendiente', component: PendingRequestsComponent},
    {path: 'calificacion', component: QualificationRequestsComponent},
    {path: 'inspeccion', component: InspectionRequestsComponent},
    {path: 'pase-caja', component: CheckoutGenerationComponent},
    {path: 'pago', component: PaymentRequestsComponent},
    {path: 'validacion-pago', component: PaymentValidateComponent},
    {path: 'pagado', component: PaidRequestsComponent},
    {path: 'pendiente-anuencia', component: ConsentGenerationComponent},
    {path: 'validacion-anuencia', component: ConsentValidationComponent},
    {path: 'documentacion-complementaria', component: ComplementaryDocsRequestComponent},
    {path: 'validacion-documentacion-complementaria', component: ComplementaryDocsValidationComponent},
    {path: 'elaboracion', component: ElaborationRequestsComponent},
    {path: 'doc-pendiente', component: PendingPaymentDocRequestsComponent},
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
        RequestDetailComponent,
        ElaborationRequestsComponent,
        PendingPaymentDocRequestsComponent,
        ConsentGenerationComponent,
        ConsentValidationComponent,
        ComplementaryDocsRequestComponent,
        ComplementaryDocsValidationComponent,
        CheckoutGenerationComponent,
        GeneralRequestsComponent,
        PredialFormComponent,
        AddLicenciaFuncionamientoFormComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        LayoutsModule,
        NgxDropzoneModule,
        CurrencyMaskModule,
        RouterModule.forChild(routes)
    ]
})
export class RequestsModule {
}
