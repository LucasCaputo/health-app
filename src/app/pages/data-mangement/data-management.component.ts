import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';

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

export class DataManagementComponent {
  examForm: FormGroup;
  consultationForm: FormGroup;
  cityForm: FormGroup;

  exams: string[] = ['Exame de Sangue', 'Exame de Urina'];
  consultations: string[] = ['Ortopedia', 'Odontologia'];
  cities: string[] = ['Caruaru', 'Recife'];

  filteredExams: string[] = [...this.exams];
  filteredConsultations: string[] = [...this.consultations];
  filteredCities: string[] = [...this.cities];

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
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

  openConfirmationDialog(message: string) {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: { message },
    }).afterClosed();
  }

  addItem(form: FormGroup, list: string[], filteredList: string[]) {
    const name = form.get('name')?.value.trim();

    this.openConfirmationDialog(`Deseja adicionar "${name}"?`).subscribe((confirmed) => {
      if (confirmed && name && !list.includes(name)) {
        list.push(name);
        this.filterList('', list, filteredList); // Atualiza a lista filtrada
        form.get('name')?.reset();
      } else if (list.includes(name)) {
        alert('O item já existe na lista!');
      }
    });
  }

  deleteItem(list: string[], filteredList: string[], item: string) {
    this.openConfirmationDialog(`Deseja excluir "${item}"?`).subscribe((confirmed) => {
      if (confirmed) {
        const index = list.indexOf(item);
        if (index > -1) {
          list.splice(index, 1);
          this.filterList('', list, filteredList); // Atualiza a lista filtrada
        }
      }
    });
  }

  initializeSearchListeners() {
    this.examForm.get('search')?.valueChanges.subscribe((searchTerm) =>
      this.filterList(searchTerm, this.exams, this.filteredExams)
    );

    this.consultationForm.get('search')?.valueChanges.subscribe((searchTerm) =>
      this.filterList(searchTerm, this.consultations, this.filteredConsultations)
    );

    this.cityForm.get('search')?.valueChanges.subscribe((searchTerm) =>
      this.filterList(searchTerm, this.cities, this.filteredCities)
    );
  }

  filterList(searchTerm: string, originalList: string[], filteredList: string[]) {
    searchTerm = searchTerm.toLowerCase();
    filteredList.length = 0;
    filteredList.push(
      ...originalList.filter((item) =>
        item.toLowerCase().includes(searchTerm)
      )
    );
  }
}
