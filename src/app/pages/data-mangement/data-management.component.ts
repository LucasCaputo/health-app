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
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { TypeService } from '../../shared/services/type.service';

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
  ],
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.scss'],
})

export class DataManagementComponent implements OnInit {
  examForm: FormGroup;
  consultationForm: FormGroup;
  cityForm: FormGroup;

  consultations$: Observable<any[]> = this.typeService.getTypes('CONSULTA');
  exams$: Observable<any[]> = this.typeService.getTypes('EXAME');
  cities$: Observable<any[]> = this.typeService.getTypes('TRANSPORTE');

  filteredConsultations$ = new BehaviorSubject<any[]>([]);
  filteredExams$ = new BehaviorSubject<any[]>([]);
  filteredCities$ = new BehaviorSubject<any[]>([]);

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private typeService: TypeService
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
    this.consultations$.subscribe((consultations) =>
      this.filteredConsultations$.next(consultations)
    );

    this.exams$.subscribe((exams) =>
      this.filteredExams$.next(exams)
    );

    this.cities$.subscribe((cities) =>
      this.filteredCities$.next(cities)
    );
  }

  openConfirmationDialog(message: string) {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: { message },
    }).afterClosed();
  }

  addItem(form: FormGroup, filtered$: BehaviorSubject<any[]>, apiType: string) {
    const name = form.get('name')?.value.trim();

    if (!name) return;

    this.openConfirmationDialog(`Deseja adicionar "${name}"?`).subscribe((confirmed) => {
      if (confirmed) {
        const newItem = { nome: name };
        const updatedList = [...filtered$.getValue(), newItem];
        filtered$.next(updatedList);

        // Chame a API aqui para salvar o novo item, se necessário
        // this.typeService.createType({ nome: newItem.nome, categoria: apiType }).subscribe();

        form.get('name')?.reset();
      }
    });
  }

  deleteItem(item: any, filtered$: BehaviorSubject<any[]>, apiType: string) {
    this.openConfirmationDialog(`Deseja excluir "${item.nome}"?`).subscribe((confirmed) => {
      if (confirmed) {
        const updatedList = filtered$.getValue().filter((i) => i.nome !== item.nome);
        filtered$.next(updatedList);

        // Chame a API para excluir o item, se necessário
        // this.typeService.deleteType(apiType, item.id).subscribe();
      }
    });
  }

  filterItems(searchTerm: string, original$: Observable<any[]>, filtered$: BehaviorSubject<any[]>) {
    searchTerm = searchTerm.toLowerCase();
    original$.pipe(
      map((items) =>
        items.filter((item) => item.nome.toLowerCase().includes(searchTerm))
      )
    ).subscribe((filtered) => filtered$.next(filtered));
  }

  initializeSearchListeners() {
    this.consultationForm.get('search')?.valueChanges.subscribe((searchTerm) =>
      this.filterItems(searchTerm, this.consultations$, this.filteredConsultations$)
    );

    this.examForm.get('search')?.valueChanges.subscribe((searchTerm) =>
      this.filterItems(searchTerm, this.exams$, this.filteredExams$)
    );

    this.cityForm.get('search')?.valueChanges.subscribe((searchTerm) =>
      this.filterItems(searchTerm, this.cities$, this.filteredCities$)
    );
  }
}
