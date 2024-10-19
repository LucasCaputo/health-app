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
    return of([

      {
        id: 1,
        nome: 'Solicitação 1',
        tipo: 'CONSULTA',
        conteudo: 'Conteúdo',
        tempo: '2 horas e 30 minutos',
        servico: {
          id: 1,
          nome: 'Serviço 1',
          categoria: 'EXAME'
        },
        status: 'CONCLUÍDO',
        observacao: 'Observação',
        protocolo: 'XPTO - 123456',
        dataSolicitacao: '2021-08-01',
        dataConclusao: '2021-08-01',
        paciente: {
          id: 1,
          nome: 'Paciente 1',
          cpf: '123456789',
          dataNascimento: '1990-01-01'
        },
        usuarioSolicitante: {
          id: 1,
          nome: 'Usuário 1',
          username: 'user1',
          password: 'password1',
          role: 'ADMIN',
          email: 'user1@example.com',
          paciente: {
            id: 1,
            nome: 'Paciente 1',
            cpf: '123456789',
            dataNascimento: '1990-01-01'
          },
          enabled: true,
          authorities: [
            {
              authority: 'ROLE_ADMIN'
            }
          ],
          accountNonLocked: true,
          accountNonExpired: true,
          credentialsNonExpired: true
        }
      },
      {
        id: 2,
        nome: 'Solicitação 2',
        tipo: 'EXAME',
        conteudo: 'Conteúdo',
        tempo: '1 horas e 30 minutos',
        servico: {
          id: 2,
          nome: 'Serviço 2',
          categoria: 'EXAME'
        },
        status: 'PENDENTE',
        observacao: 'Observação 2',
        protocolo: 'XPTO - 654321',
        dataSolicitacao: '2021-08-02',
        dataConclusao: '2021-08-02',
        paciente: {
          id: 2,
          nome: 'Paciente 2',
          cpf: '987654321',
          dataNascimento: '1995-05-05'
        },
        usuarioSolicitante: {
          id: 2,
          nome: 'Usuário 2',
          username: 'user2',
          password: 'password2',
          role: 'ADMIN',
          email: 'user2@example.com',
          paciente: {
            id: 2,
            nome: 'Paciente 2',
            cpf: '987654321',
            dataNascimento: '1995-05-05'
          },
          enabled: true,
          authorities: [
            {
              authority: 'ROLE_ADMIN'
            }
          ],
          accountNonLocked: true,
          accountNonExpired: true,
          credentialsNonExpired: true
        }
      }
    ]);
    // return this.http.get<ReviewOrderInterfaceResponse[]>(`${this.apiUrl}/solicitacoes`);
  }

  approveOrDenySolicitacoes(status: string, solicitacoes: ReviewOrderInterfaceResponse[]): Observable<ReviewOrderInterfaceResponse[]> {
    // Make API call to approve or deny solicitacoes with the given status
    // For example:
    // return this.http.put<ReviewOrderInterfaceResponse[]>(`${this.apiUrl}/solicitacoes/status/${status}`, solicitacoes);
    return of(solicitacoes); // Placeholder return statement
  }
}
