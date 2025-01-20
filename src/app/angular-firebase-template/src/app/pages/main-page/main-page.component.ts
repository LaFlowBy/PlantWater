import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { PlantCardComponent } from "../../components/plant-card/plant-card.component";
import { Plant } from '../../models/plant';
import { PlantsService } from '../../services/plants.service';


@Component({
  imports: [CommonModule, PlantCardComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  standalone: true
})
export class MainPageComponent  implements OnInit{
  plantService = inject(PlantsService);

  plants : any[] = []
  
  constructor() {}

  ngOnInit(): void {
    this.plantService.getPlants().subscribe((data) => {
      this.plants = data;
      console.log('Plants:', this.plants); // Debug output
    });
  }

  plantSelected(plant: Plant) {
    console.log(plant);
  }

  ngOnDestroy(): void {
  
  }
}
