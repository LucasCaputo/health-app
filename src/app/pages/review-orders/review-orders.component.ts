import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ReviewOrderInterfaceResponse } from '../../shared/interfaces/review-orders.interface';
import { OrdersService } from '../../shared/services/orders.service';
import { UserService } from '../../shared/services/user.service';


@Component({
  selector: 'app-review-orders',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink, DatePipe],
  templateUrl: './review-orders.component.html',
  styleUrls: ['./review-orders.component.scss']
})
export class ReviewOrdersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'solicitante', 'tipo', 'status', 'protocolo', 'data', 'acoes'];
  dataSource = new MatTableDataSource<ReviewOrderInterfaceResponse>([]);

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

  aprovarSolicitacao(solicitacao: ReviewOrderInterfaceResponse) {
    alert(`Solicitação aprovada: ${solicitacao.nomeServico} - Protocolo ${solicitacao.protocolo}`);
    // Adicione lógica de aprovação aqui, como chamar um serviço de backend
  }

  negarSolicitacao(solicitacao: ReviewOrderInterfaceResponse) {
    alert(`Solicitação negada: ${solicitacao.nomeServico} - Protocolo ${solicitacao.protocolo}`);
    // Adicione lógica de negação aqui, como chamar um serviço de backend
  }
}
