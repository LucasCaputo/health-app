import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { typeInterfaceResponse } from '../../shared/interfaces/types.interface';
import { OrdersService } from '../../shared/services/orders.service';
import { TypeService } from '../../shared/services/type.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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

  selectedItemControl = new FormControl(); // Controlador do mat-select
  tipoViagemControl = new FormControl(); // Controlador do mat-select

  consultas$: Observable<typeInterfaceResponse[]> = this.typeService.getTypes('CONSULTA');
  exames$: Observable<typeInterfaceResponse[]> = this.typeService.getTypes('EXAME');
  transportes$: Observable<typeInterfaceResponse[]> = this.typeService.getTypes('TRANSPORTE');

  constructor(
    private typeService: TypeService,
    private orderService: OrdersService,
    public userService: UserService
  ) { }

  showDropdown(action: 'consultas' | 'exames' | 'transporte') {
    this.activeAction = action;
    this.protocolo = null; // Limpar protocolo ao mudar de ação
  }

  resetView() {
    this.activeAction = null;
    this.protocolo = null;
    this.selectedItemControl.reset();
  }

  confirmar() {
    const selectedId = this.selectedItemControl.value;

    if (selectedId !== null) {
      this.orderService.createOrder(selectedId).subscribe((response) => {
        this.protocolo = response.protocolo;
      });
    } else {
      alert('Selecione um item antes de confirmar!');
    }
  }
}