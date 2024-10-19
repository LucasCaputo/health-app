import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, RouterModule } from '@angular/router';
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
    RouterModule,
  ],
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})
export class NewAccountComponent {
  newAccountForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { // Add userService in the constructor
    this.newAccountForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.newAccountForm.valid) {
      const formData = this.newAccountForm.value;
      console.log('Conta criada com sucesso:', formData);
      // Adicione a lógica para enviar os dados para a API ou serviço de backend.
      this.userService.createAccount(formData.name, formData.password, formData.email).subscribe(
        (response) => {
          console.log('Account created successfully:', response);
          // Add any additional logic after successful account creation.
        },
        (error) => {
          console.log('Error creating account:', error);
          // Handle any errors that occur during account creation.
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }
}
