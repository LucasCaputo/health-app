import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SecretariaGuard implements CanActivate {
    constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

    canActivate(): Observable<boolean | UrlTree> {
        if (isPlatformBrowser(this.platformId)) {
            const userRole = window.sessionStorage.getItem('role');
            const token = window.sessionStorage.getItem('token');

            if (!token) {
                this.router.navigate(['/login']);
                return of(false);
            }

            if (userRole === 'ROLE_SECRETARIA') {
                return of(true);
            }
        }

        // Redireciona para a página de pedido caso o usuário não tenha permissão
        return of(this.router.createUrlTree(['/pedido']));
    }
}
