import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Plant } from '../../models/plant';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plant-card',
  imports: [CommonModule],
  templateUrl: './plant-card.component.html',
  styleUrl: './plant-card.component.scss'
})
export class PlantCardComponent {

  @Input() plant : Plant | undefined;

  @Output() plantSelected: EventEmitter<Plant> = new EventEmitter();

  constructor(private router: Router) { }
  
  openDetails() {
    this.router.navigate(['/plants/' + this.plant?.id]);
    this.plantSelected.emit(this.plant);
  }
}
