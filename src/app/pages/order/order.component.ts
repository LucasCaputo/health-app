import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { first, Observable } from 'rxjs';
import { typeInterfaceResponse } from '../../shared/interfaces/types.interface';
import { OrdersService } from '../../shared/services/orders.service';
import { TypeService } from '../../shared/services/type.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
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

  consultas$: Observable<typeInterfaceResponse[]> = this.typeService.getTypes('CONSULTA');
  exames$: Observable<typeInterfaceResponse[]> = this.typeService.getTypes('EXAME');
  transportes$: Observable<typeInterfaceResponse[]> = this.typeService.getTypes('TRANSPORTE');

  constructor(private typeService: TypeService, private orderService: OrdersService, public userService: UserService) { }

  showDropdown(action: 'consultas' | 'exames' | 'transporte') {
    this.activeAction = action;
    this.protocolo = null; // Limpar protocolo ao mudar de ação
  }

  resetView() {
    this.activeAction = null;
    this.protocolo = null;
  }

  confirmar() {

    if (this.activeAction === 'consultas') {
      return this.orderService.createOrder(1).pipe(first()).subscribe(response => {
        this.protocolo = response.protocolo;
      });
    }
    if (this.activeAction === 'exames') {
      return this.orderService.createOrder(2).pipe(first()).subscribe(response => {
        this.protocolo = response.protocolo;
      });
    }
    if (this.activeAction === 'transporte') {
      return this.orderService.createOrder(3).pipe(first()).subscribe(response => {
        this.protocolo = response.protocolo;
      });
    }

    return null; // Add a default return statement
  }

}