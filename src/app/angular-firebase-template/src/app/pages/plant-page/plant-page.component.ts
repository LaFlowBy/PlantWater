import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-plant-page',
  imports: [],
  templateUrl: './plant-page.component.html',
  styleUrl: './plant-page.component.scss'
})
export class PlantPageComponent {

  id: string | null = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
