import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  activeAction: 'consultas' | 'exames' | 'transporte' | null = null;
  protocolo: string | null = null;

  showDropdown(action: 'consultas' | 'exames' | 'transporte') {
    this.activeAction = action;
    this.protocolo = null; // Limpar protocolo ao mudar de ação
  }

  resetView() {
    this.activeAction = null;
    this.protocolo = null;
  }

  confirmar() {
    this.protocolo = this.gerarProtocolo();
  }

  gerarProtocolo(): string {
    return Math.floor(Math.random() * 1000000).toString().padStart(6, '0'); // Gera protocolo de 6 dígitos
  }
}