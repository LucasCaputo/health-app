import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../../shared/services/orders.service';
import { UserService } from '../../shared/services/user.service';


export interface Solicitation {
  id: number;
  nome: string;
  protocolo: string;
  tipo: string;
  conteudo: string;
  tempo: string;
}

@Component({
  selector: 'app-review-orders',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './review-orders.component.html',
  styleUrls: ['./review-orders.component.scss']
})
export class ReviewOrdersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'protocolo', 'tipo', 'conteudo', 'tempo', 'acoes'];
  dataSource = new MatTableDataSource<Solicitation>([]);

  constructor(private ordersService: OrdersService, public userService: UserService) { }

  ngOnInit(): void {
    this.ordersService.getSolicitacoes().subscribe((solicitacoes: any[]) => {
      this.dataSource.data = solicitacoes;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  aprovarSolicitacao(solicitacao: Solicitation) {
    alert(`Solicitação aprovada: ${solicitacao.nome} - Protocolo ${solicitacao.protocolo}`);
    // Adicione lógica de aprovação aqui, como chamar um serviço de backend
  }

  negarSolicitacao(solicitacao: Solicitation) {
    alert(`Solicitação negada: ${solicitacao.nome} - Protocolo ${solicitacao.protocolo}`);
    // Adicione lógica de negação aqui, como chamar um serviço de backend
  }
}
