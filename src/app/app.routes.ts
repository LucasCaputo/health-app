import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NewAccountComponent } from './pages/new-account/new-account.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'new-account', component: NewAccountComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
