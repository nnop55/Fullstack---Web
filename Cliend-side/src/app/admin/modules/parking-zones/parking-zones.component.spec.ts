import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingZonesComponent } from './parking-zones.component';

describe('ParkingZonesComponent', () => {
  let component: ParkingZonesComponent;
  let fixture: ComponentFixture<ParkingZonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingZonesComponent]
    });
    fixture = TestBed.createComponent(ParkingZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
