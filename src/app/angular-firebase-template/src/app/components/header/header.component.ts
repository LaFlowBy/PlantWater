import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  chatService = inject(LoginService);
  user$ = this.chatService.user$;

  logout() {
    this.chatService.logout();
  }
}
