import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
})
export class RecoveryPasswordComponent {
  recoveryPasswordForm: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder, private userService: UserService) { // Add UserService in the constructor
    this.recoveryPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.recoveryPasswordForm.valid) {
      this.isSubmitted = true;
      const email = this.recoveryPasswordForm.value.email;
      console.log(`Email enviado para: ${email}`);
      this.userService.recoverPassword(email).subscribe(); // Call the recoverPassword method from UserService
    }
  }
}
