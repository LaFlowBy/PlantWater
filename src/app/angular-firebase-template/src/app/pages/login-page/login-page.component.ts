import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  standalone: true
})
export class LoginPageComponent {
  loginService = inject(LoginService);
  user$ = this.loginService.user$;
  email: string = '';
  password: string = '';
  notification: string = '';

  constructor() {}

  async login(event: Event) {
    event.preventDefault(); // Prevent the default form submission behavior
    if(this.email === '' || this.password === '') {
      this.notification = 'Please enter an email and password.';
      return;
    }
    const result = await this.loginService.login(this.email, this.password);

    if(result) {
      this.notification = 'Login successful.';
    } else {
      this.notification = 'Login failed.';
    }
  }
}