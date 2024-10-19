import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
    { path: 'nova-conta', loadComponent: () => import('./pages/new-account/new-account.component').then(m => m.NewAccountComponent) },
    { path: 'recuperar-senha', loadComponent: () => import('./pages/recovery-password/recovery-password.component').then(m => m.RecoveryPasswordComponent) },
    { path: 'gerenciamento-de-dados', loadComponent: () => import('./pages/data-mangement/data-management.component').then(m => m.DataManagementComponent) },
    { path: 'solicitações', loadComponent: () => import('./pages/order/order.component').then(m => m.OrderComponent) },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
