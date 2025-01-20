import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PLANT_DATA } from '../../../mock_data/mock-plant-data';
import { PlantsService } from '../../services/plants.service';
import { CommonModule } from '@angular/common'; // Import CommonModule


@Component({
  selector: 'app-plant-page',
  imports: [CommonModule],
  templateUrl: './plant-page.component.html',
  styleUrl: './plant-page.component.scss'
})


export class PlantPageComponent {

  id: string | null = '';
  plant: any = null;

  constructor(private route: ActivatedRoute, private plantService: PlantsService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Plant ID:', this.id); // Debug: Check the ID from the route
 
    if (this.id) {
      this.plant = this.plantService.getPlantById(this.id);
      if (!this.plant) {
        console.error('Plant not found in cached data');
      } else {
        console.log('Plant details:', this.plant); // Debug: Log plant details
      }
    }
  }
}
