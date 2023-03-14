import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {registerLocaleData} from "@angular/common";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutsModule} from "./layouts/layouts.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import localeEsMX from '@angular/common/locales/es-MX';
import {NgxSpinnerModule} from "ngx-spinner";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";

registerLocaleData(localeEsMX, 'mx');


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxSpinnerModule.forRoot({ type: 'ball-beat' }),
        LayoutsModule,
        BrowserAnimationsModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        { provide: LOCALE_ID, useValue: 'mx' }
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
