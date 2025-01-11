import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plants-page',
  imports: [],
  templateUrl: './plants-page.component.html',
  styleUrl: './plants-page.component.scss'
})
export class PlantsPageComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }

  routeToPlant(id:number) {
    this.router.navigate(['/plants/' + id]);
  }
}
