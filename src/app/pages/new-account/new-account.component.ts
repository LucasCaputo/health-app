import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-new-account',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    NgxMaskDirective,
  ],
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})
export class NewAccountComponent {
  newAccountForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private dateAdapter: DateAdapter<any>) { // Add dateAdapter in the constructor
    this.newAccountForm = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, this.cpfValidator]],
      dataNascimento: ['', [Validators.required, this.dataNascimentoValidator]],
    });
  }

  public onSubmit() {
    if (this.newAccountForm.valid) {
      const formData = this.newAccountForm.value;
      const dataNascimento = formData.dataNascimento;
      const formattedDataNascimento = `${dataNascimento.substring(4)}-${dataNascimento.substring(2, 4)}-${dataNascimento.substring(0, 2)}`;

      // Adicione a lógica para enviar os dados para a API ou serviço de backend.
      this.userService.createAccount(
        formData.nomeCompleto,
        formData.username,
        formData.email,
        formData.cpf,
        formattedDataNascimento,
        formData.password,
      ).subscribe({
        next: (response) => console.log('Account created successfully:', response),
        error: (error) => console.log('Error creating account:', error),
      });
    } else {
      console.log('Formulário inválido');
    }
  }

  // CPF Validator
  private cpfValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const cpfRegex = /^\d{3}\d{3}\d{3}\d{2}$/;

    if (!cpfRegex.test(value)) {
      return { invalidCpf: true };
    }

    const cpfNumbers = value.replace(/\D/g, '');
    let cpfDigits = cpfNumbers.substr(0, 9);
    let sum = 0;
    let remainder;

    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpfDigits.charAt(i)) * (10 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpfNumbers.charAt(9))) {
      return { invalidCpf: true };
    }

    sum = 0;
    cpfDigits += remainder;

    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpfDigits.charAt(i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpfNumbers.charAt(10))) {
      return { invalidCpf: true };
    }

    return null;
  }

  // Validador customizado para o formato de data DD/MM/YYYY
  private dataNascimentoValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const regex = /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])\d{4}$/;

    if (!regex.test(value)) {
      return { invalidDate: true };
    }

    const year = value.substring(4);
    if (year.startsWith('19')) {
      return null;
    } else {
      return { invalidYear: true };
    }
  }
}
