import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './contants/api-url.contant';

interface ApiResponse {
  // Define the structure of the API response here
  // For example, if the response contains a token, you can define it like this:
  token: string;
  // Add other properties as needed
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = API_URL// Replace with your API URL

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<ApiResponse> {
    // Make API call to login endpoint
    return this.http.post<ApiResponse>(`${this.apiUrl}/login`, { username, password });
  }

  public createAccount(username: string, password: string, email: string): Observable<ApiResponse> {
    // Make API call to create account endpoint
    return this.http.post<ApiResponse>(`${this.apiUrl}/new-account`, { username, password, email });
  }

  public recoverPassword(email: string): Observable<ApiResponse> {
    // Make API call to recover password endpoint
    return this.http.post<ApiResponse>(`${this.apiUrl}/recovery-password`, { email });
  }
}
