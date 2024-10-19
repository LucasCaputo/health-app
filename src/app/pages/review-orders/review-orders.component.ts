import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


export interface Solicitation {
  id: number;
  nome: string;
  protocolo: string;
  tipo: string;
  conteudo: string;
  tempo: string;
}

const SOLICITACOES: Solicitation[] = [
  { id: 1, nome: 'João Silva', protocolo: '#12345', tipo: 'Consulta', conteudo: 'Dermatologista', tempo: '2 horas atrás' },
  { id: 2, nome: 'Maria Santos', protocolo: '#67890', tipo: 'Exame', conteudo: 'Raio-X', tempo: '1 dia atrás' },
  { id: 3, nome: 'Carlos Mendes', protocolo: '#54321', tipo: 'Transporte', conteudo: 'Hospital - Ida e Volta', tempo: '30 minutos atrás' }
];

@Component({
  selector: 'app-review-orders',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './review-orders.component.html',
  styleUrls: ['./review-orders.component.scss']
})
export class ReviewOrdersComponent {
  displayedColumns: string[] = ['id', 'nome', 'protocolo', 'tipo', 'conteudo', 'tempo', 'acoes'];
  dataSource = new MatTableDataSource(SOLICITACOES);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  aprovarSolicitacao(solicitacao: Solicitation) {
    alert(`Solicitação aprovada: ${solicitacao.nome} - Protocolo ${solicitacao.protocolo}`);
  }

  negarSolicitacao(solicitacao: Solicitation) {
    alert(`Solicitação negada: ${solicitacao.nome} - Protocolo ${solicitacao.protocolo}`);
  }
}
