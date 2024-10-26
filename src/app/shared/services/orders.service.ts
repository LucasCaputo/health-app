import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.post<OrderInterfaceResponse>(`${this.apiUrl}/api/solicitacoes/criar?tipoServicoId=${tipoServicoId}`, {});
  }

  getSolicitacoes(): Observable<ReviewOrderInterfaceResponse[]> {
    return this.http.get<ReviewOrderInterfaceResponse[]>(`${this.apiUrl}/api/solicitacoes/status/PENDENTE`);
  }

  approveSolicitacoes(id: number, observacao: string): Observable<ReviewOrderInterfaceResponse[]> {
    const dataConclusao = new Date().toISOString().split('T')[0];
    return this.http.post<ReviewOrderInterfaceResponse[]>(`${this.apiUrl}/api/solicitacoes/${id}/aceitar?observacao=${observacao}&dataConclusao=${dataConclusao}`, {});
  }

  denySolicitacoes(id: number, observacao: string): Observable<ReviewOrderInterfaceResponse[]> {
    const dataConclusao = new Date().toISOString().split('T')[0];
    return this.http.post<ReviewOrderInterfaceResponse[]>(`${this.apiUrl}/api/solicitacoes/${id}/negar?observacao=${observacao}&dataConclusao=${dataConclusao}`, {});
  }
}
