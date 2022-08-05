import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BaseComponent} from "./layouts/base/base.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
    {path: '', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)},
    {
        path: '',
        component: BaseComponent,
        // canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
