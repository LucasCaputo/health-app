import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API_URL } from '../contants/api-url.contant';
import { LogEntry } from '../interfaces/log.interface';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private apiUrl = API_URL; // Substitua pelo endpoint correto

  constructor(private http: HttpClient) { }

  getLogs(): Observable<LogEntry[]> {

    return of(
      [
        {
          timestamp: '2021-08-10T10:00:00Z',
          level: 'INFO',
          message: 'User logged in',
          context: 'User',
          usuario: 'admin'
        },
        {
          timestamp: '2021-08-10T10:00:00Z',
          level: 'INFO',
          message: 'User logged in',
          context: 'User',
          usuario: 'admin'
        },
        {
          timestamp: '2021-08-10T10:00:00Z',
          level: 'INFO',
          message: 'User logged in',
          context: 'User',
          usuario: 'admin'
        }
      ]
    )
    // return this.http.get<LogEntry[]>(this.apiUrl + '/api/logs');
  }
}
