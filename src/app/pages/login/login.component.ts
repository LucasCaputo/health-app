import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      console.log('Username: ' + username + ' Password: ' + password);

      this.userService.login(username, password).subscribe({
        next: (response) => {
          window.sessionStorage.setItem('token', response.token);
          window.sessionStorage.setItem('role', response.role);

          if (response.role === 'ROLE_SECRETARIA') {
            this.router.navigate(['/revisar-pedidos']);
          } else {
            this.router.navigate(['/pedido']);
          }
        },
        error: (error) => {
          window.alert('Error ao fazer o login verifique seu login e senha e tente novamente');
          console.log('Error login account:', error)
        },
      });
    }
  }
}
