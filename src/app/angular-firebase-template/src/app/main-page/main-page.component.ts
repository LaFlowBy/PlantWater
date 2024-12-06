import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import Fireworks from 'fireworks-js';

@Component({
  selector: 'app-main-page',
  imports: [CommonModule ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  standalone: true
})
export class MainPageComponent  implements OnInit, AfterViewInit{
  
  private fireworks!: Fireworks;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.startFireworks();
  }

  startFireworks(): void {
    const container = document.getElementById('fireworks-container');
    if (container) {
      this.fireworks = new Fireworks(container);
      this.fireworks.start();
    }
  }

  get isBirthday(): boolean {
    const today = new Date();
    const birthDate = new Date(2024, 12, 7);
    return today.getTime() === birthDate.getTime();
  }

  ngOnDestroy(): void {
    if (this.fireworks) {
      this.fireworks.stop();
    }
  }
}
