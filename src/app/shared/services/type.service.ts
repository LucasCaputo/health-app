import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../contants/api-url.contant';
import { categoryType, typeInterfaceRequest, typeInterfaceResponse } from '../interfaces/types.interface';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) { }

  public getTypes(type: categoryType): Observable<typeInterfaceResponse[]> {
    return this.http.get<typeInterfaceResponse[]>(`${this.apiUrl}/api/tipos/${type}`);
  }

  public createType(type: typeInterfaceRequest): Observable<typeInterfaceRequest> {
    return this.http.post<typeInterfaceRequest>(`${this.apiUrl}/api/tipos`, type);
  }
}
