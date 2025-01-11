import { Injectable } from '@angular/core';
import { Plant } from '../models/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantsService {

  constructor() { }

  getPlants() : Plant[] {
    return [
      {id: '1', name: 'Efeutute', species: 'Kletterpflanze'},
      {id: '2', name: 'Kaktus', species: 'Kletterpflanze'},
      {id: '3', name: 'Blume', species: 'Kletterpflanze'}
    ];
  }
}
