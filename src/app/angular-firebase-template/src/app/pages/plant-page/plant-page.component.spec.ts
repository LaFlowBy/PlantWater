import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantPageComponent } from './plant-page.component';

describe('PlantPageComponent', () => {
  let component: PlantPageComponent;
  let fixture: ComponentFixture<PlantPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
