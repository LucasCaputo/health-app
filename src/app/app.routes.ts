import { Routes } from '@angular/router';
import { PedidoGuard } from './shared/guards/pedido.guard';
import { SecretariaGuard } from './shared/guards/secretaria.guard';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
    { path: 'nova-conta', loadComponent: () => import('./pages/new-account/new-account.component').then(m => m.NewAccountComponent) },
    // { path: 'recuperar-senha', loadComponent: () => import('./pages/recovery-password/recovery-password.component').then(m => m.RecoveryPasswordComponent) },
    { path: 'gerenciar-dados', canActivate: [SecretariaGuard], loadComponent: () => import('./pages/data-mangement/data-management.component').then(m => m.DataManagementComponent) },
    { path: 'revisar-pedidos', canActivate: [SecretariaGuard], loadComponent: () => import('./pages/review-orders/review-orders.component').then(m => m.ReviewOrdersComponent) },
    { path: 'pedido', canActivate: [PedidoGuard], loadComponent: () => import('./pages/order/order.component').then(m => m.OrderComponent) },
    // { path: 'audit', loadComponent: () => import('./pages/audit/audit.component').then(m => m.AuditComponent) },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
