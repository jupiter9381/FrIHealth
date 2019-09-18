import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMenuComponent } from './single-menu.component';

describe('SingleMenuComponent', () => {
  let component: SingleMenuComponent;
  let fixture: ComponentFixture<SingleMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
