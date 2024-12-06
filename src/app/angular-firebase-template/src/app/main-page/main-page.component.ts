import { AfterViewInit, Component, OnInit } from '@angular/core';
import Fireworks from 'fireworks-js';

@Component({
  selector: 'app-main-page',
  imports: [],
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

  ngOnDestroy(): void {
    if (this.fireworks) {
      this.fireworks.stop();
    }
  }
}
