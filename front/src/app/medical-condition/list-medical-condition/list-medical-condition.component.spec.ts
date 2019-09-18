import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedicalConditionComponent } from './list-medical-condition.component';

describe('ListMedicalConditionComponent', () => {
  let component: ListMedicalConditionComponent;
  let fixture: ComponentFixture<ListMedicalConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMedicalConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMedicalConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
