import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API_URL } from '../contants/api-url.contant';
import { OrderInterfaceResponse } from '../interfaces/order.interface';
import { ReviewOrderInterfaceResponse } from '../interfaces/review-orders.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) { }

  createOrder(tipoServicoId?: number): Observable<OrderInterfaceResponse> {
    return of({
      id: 1,
      nomeServico: 'Ortopedia 1',
      categoriaServico: 'CONSULTA',
      status: 'PENDENTE',
      protocolo: 'XPTO - 123456',
      dataSolicitacao: '2021-08-01',
      observacao: 'Observação',
      dataConclusao: '2021-08-01',
      solicitante: 'João'
    });
    // return this.http.post<OrderInterfaceResponse>(this.apiUrl, { tipoServicoId });
  }

  getSolicitacoes(): Observable<ReviewOrderInterfaceResponse[]> {
    return this.http.get<ReviewOrderInterfaceResponse[]>(`${this.apiUrl}/api/solicitacoes/status/PENDENTE`);
  }

  approveOrDenySolicitacoes(status: string, solicitacoes: ReviewOrderInterfaceResponse[]): Observable<ReviewOrderInterfaceResponse[]> {
    // Make API call to approve or deny solicitacoes with the given status
    // For example:
    // return this.http.put<ReviewOrderInterfaceResponse[]>(`${this.apiUrl}/api/solicitacoes/status/${status}`, solicitacoes);
    return of(solicitacoes); // Placeholder return statement
  }
}
