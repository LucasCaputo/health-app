import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
    const platformId = inject(PLATFORM_ID); // Injeta o ID da plataforma
    let authToken = '';

    // Verifica se estamos no navegador e recupera o token do sessionStorage
    if (isPlatformBrowser(platformId)) {
        authToken = sessionStorage.getItem('token') || '';
    }

    // Clona a requisição e adiciona o cabeçalho Authorization, se o token existir
    const authReq = authToken
        ? req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authToken}`),
        })
        : req;

    return next(authReq);
};
