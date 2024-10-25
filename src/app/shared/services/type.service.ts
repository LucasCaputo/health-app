import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API_URL } from '../contants/api-url.contant';
import { categoryType, typeInterfaceRequest, typeInterfaceResponse } from '../interfaces/types.interface';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) { }

  public getTypes(type: categoryType): Observable<typeInterfaceResponse[]> {

    if (type === 'TRANSPORTE') {
      return of([
        // Mock data based on typeInterfaceResponse interface
        { id: 1, nome: 'cidade 1', categoria: 'TRANSPORTE' },
        { id: 2, nome: 'cidade 2', categoria: 'TRANSPORTE' },
        { id: 3, nome: 'cidade 3', categoria: 'TRANSPORTE' }
      ]);
    }

    if (type === 'CONSULTA') return of([
      // Mock data based on typeInterfaceResponse interface
      { id: 1, nome: 'Ortopedia 1', categoria: 'CONSULTA' },
      { id: 2, nome: 'Odontologia 2', categoria: 'CONSULTA' },
      { id: 3, nome: 'Dermatologia 3', categoria: 'CONSULTA' }
    ]);

    if (type === 'EXAME') {
      return of([
        // Mock data based on typeInterfaceResponse interface
        { id: 1, nome: 'Exame Sangue', categoria: 'EXAME' },
        { id: 2, nome: 'Exame Urina', categoria: 'EXAME' },
        { id: 3, nome: 'Exame Vista', categoria: 'EXAME' }
      ]);
    }


    return this.http.get<typeInterfaceResponse[]>(`${this.apiUrl}/tipos/${type}`);
  }

  public createType(type: typeInterfaceRequest): Observable<typeInterfaceRequest> {
    return this.http.post<typeInterfaceRequest>(`${this.apiUrl}/api/tipos`, type);
  }
}
