import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMedicalConditionComponent } from './update-medical-condition.component';

describe('UpdateMedicalConditionComponent', () => {
  let component: UpdateMedicalConditionComponent;
  let fixture: ComponentFixture<UpdateMedicalConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMedicalConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMedicalConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
