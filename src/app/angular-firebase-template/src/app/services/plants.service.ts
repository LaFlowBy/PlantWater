import { Injectable } from '@angular/core';
//import { Plant } from '../models/plant';
import { Firestore, collection, collectionData, query, where, getDocs } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

/*
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
*/

@Injectable({
  providedIn: 'root',
})
export class PlantsService {
  private plantsCache: any[] | null = null;
  constructor(private firestore: Firestore) {}

  getPlants() {
    if (this.plantsCache) {
      // If cached, return cached data
      return new BehaviorSubject(this.plantsCache).asObservable();
    }

    const plantsCollection = collection(this.firestore, 'plants');
    //onst q = query(plantsCollection);
    return collectionData(plantsCollection, { idField: 'id' }).pipe(
      map((plants: any[]) =>
        plants.map((plant) => ({
          id: plant.id,
          name: plant.name,
          type: plant.type,
        }))
      ),
      shareReplay(1),
      map((data) => {
        this.plantsCache = data; // Store in cache
        return data;
      })
    );
  }
  // Get plant by ID
  getPlantById(id: string): any | null {
    return this.plantsCache?.find((plant) => plant.id === id) || null;
  }
}