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

  public plants : Plant[] = []
  constructor() { }

  ngOnInit(): void {
    this.plants = this.plantService.getPlants();
   }

  plantSelected(plant: Plant) {
    console.log(plant);
  }



  ngOnDestroy(): void {
  
  }
}
