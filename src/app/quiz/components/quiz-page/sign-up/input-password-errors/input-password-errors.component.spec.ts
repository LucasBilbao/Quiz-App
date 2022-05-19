import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPasswordErrorsComponent } from './input-password-errors.component';

describe('InputPasswordErrorsComponent', () => {
  let component: InputPasswordErrorsComponent;
  let fixture: ComponentFixture<InputPasswordErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputPasswordErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPasswordErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
