import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlaneComponent } from './add-plane.component';

describe('AddPlaneComponent', () => {
  let component: AddPlaneComponent;
  let fixture: ComponentFixture<AddPlaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPlaneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPlaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
