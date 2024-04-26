import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSchedulesComponent } from './update-schedules.component';

describe('UpdateSchedulesComponent', () => {
  let component: UpdateSchedulesComponent;
  let fixture: ComponentFixture<UpdateSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSchedulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
