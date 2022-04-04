import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionCreatorComponent } from './option-creator.component';

describe('OptionComponent', () => {
  let component: OptionCreatorComponent;
  let fixture: ComponentFixture<OptionCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
