import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { API_URL } from '../contants/api-url.contant';
import { NewUserInterface } from '../interfaces/new-user.interface';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = API_URL

  constructor(private http: HttpClient, private router: Router) { }

  public login(username: string, password: string): Observable<UserInterface> {
    // Make API call to login endpoint
    return this.http.post<UserInterface>(`${this.apiUrl}/auth/login`, { username, password });
  }

  public createAccount(nomeCompleto: string, username: string, email: string, cpf: string, dataNascimento: string, password: string): Observable<NewUserInterface> {
    // Make API call to create account endpoint
    return this.http.post<NewUserInterface>(`${this.apiUrl}/auth/register`, { username, password, email, nomeCompleto, cpf, dataNascimento });
  }

  public recoverPassword(email: string): Observable<any> {
    // Make API call to recover password endpoint
    return this.http.post<any>(`${this.apiUrl}/recovery-password`, { email });
  }

  public logout(): void {
    // Clear session storage
    sessionStorage.clear();

    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
