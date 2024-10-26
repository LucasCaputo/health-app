import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { TypeService } from '../../shared/services/type.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-data-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.scss'],
})

export class DataManagementComponent implements OnInit {
  examForm: FormGroup;
  consultationForm: FormGroup;
  cityForm: FormGroup;

  consultations: any[] = []; // Cache local das consultas
  exams: any[] = []; // Cache local dos exames
  cities: any[] = []; // Cache local das cidades

  filteredConsultations$ = new BehaviorSubject<any[]>([]);
  filteredExams$ = new BehaviorSubject<any[]>([]);
  filteredCities$ = new BehaviorSubject<any[]>([]);

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private typeService: TypeService,
    public userService: UserService,
  ) {
    this.examForm = this.fb.group({
      name: ['', Validators.required],
      search: [''],
    });

    this.consultationForm = this.fb.group({
      name: ['', Validators.required],
      search: [''],
    });

    this.cityForm = this.fb.group({
      name: ['', Validators.required],
      search: [''],
    });

    this.initializeSearchListeners();
  }

  ngOnInit() {
    // Carregar os dados uma vez e armazenar no cache
    this.typeService.getTypes('CONSULTA').subscribe((consultations) => {
      this.consultations = consultations;
      this.filteredConsultations$.next([...consultations]);
    });

    this.typeService.getTypes('EXAME').subscribe((exams) => {
      this.exams = exams;
      this.filteredExams$.next([...exams]);
    });

    this.typeService.getTypes('TRANSPORTE').subscribe((cities) => {
      this.cities = cities;
      this.filteredCities$.next([...cities]);
    });
  }

  openConfirmationDialog(message: string) {
    return this.dialog.open(ConfirmationDialogComponent, { data: { message } }).afterClosed();
  }

  addItem(form: FormGroup, filtered$: BehaviorSubject<any[]>, apiType: string) {
    const name = form.get('name')?.value.trim();

    if (!name) return;

    this.openConfirmationDialog(`Deseja adicionar "${name}"?`).subscribe((confirmed) => {
      if (confirmed) {
        const newItem = { nome: name };
        const updatedList = [...filtered$.getValue(), newItem];
        filtered$.next(updatedList);

        this.typeService.createType({ nome: newItem.nome, categoria: apiType, ativo: true }).subscribe();
        form.get('name')?.reset();
      }
    });
  }

  deleteItem(item: any, filtered$: BehaviorSubject<any[]>, apiType: string) {
    this.openConfirmationDialog(`Deseja desativar "${item.nome}"?`).subscribe((confirmed) => {
      if (confirmed) {
        const updatedList = filtered$.getValue().filter((i) => i.nome !== item.nome);
        filtered$.next(updatedList);

        // Opcional: Chame a API para excluir o item, se necessário
        // this.typeService.deleteType(apiType, item.id).subscribe();
      }
    });
  }

  filterItems(searchTerm: string, originalList: any[], filtered$: BehaviorSubject<any[]>) {
    searchTerm = searchTerm.toLowerCase();
    const filteredList = originalList.filter((item) =>
      item.nome.toLowerCase().includes(searchTerm)
    );
    filtered$.next(filteredList);
  }

  initializeSearchListeners() {
    this.consultationForm.get('search')?.valueChanges.subscribe((searchTerm) =>
      this.filterItems(searchTerm, this.consultations, this.filteredConsultations$)
    );

    this.examForm.get('search')?.valueChanges.subscribe((searchTerm) =>
      this.filterItems(searchTerm, this.exams, this.filteredExams$)
    );

    this.cityForm.get('search')?.valueChanges.subscribe((searchTerm) =>
      this.filterItems(searchTerm, this.cities, this.filteredCities$)
    );
  }
}
