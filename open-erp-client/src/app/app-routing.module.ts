import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {AppLayoutComponent} from "./core/theme/app.layout.component";

import {NotfoundComponent} from './demo/components/notfound/notfound.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                component: AppLayoutComponent,
                children: [
                    {path: '', loadChildren: () => import('./feature/dashboard/dashboard.module').then(m => m.DashboardModule)},
                    {path: 'cadastros', loadChildren: () => import('./feature/cadastros/cadastros.module').then(m => m.CadastrosModule)},
                    {path: 'faturamento', loadChildren: () => import('./feature/faturamento/faturamento.module').then(m => m.FaturamentoModule)}],
           },
            {path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule)},
            {path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule)},
            {path: 'pages/notfound', component: NotfoundComponent},
            {path: '**', redirectTo: 'pages/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
