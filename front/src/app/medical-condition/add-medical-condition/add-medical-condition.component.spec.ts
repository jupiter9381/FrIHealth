import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicalConditionComponent } from './add-medical-condition.component';

describe('AddMedicalConditionComponent', () => {
  let component: AddMedicalConditionComponent;
  let fixture: ComponentFixture<AddMedicalConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMedicalConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedicalConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
