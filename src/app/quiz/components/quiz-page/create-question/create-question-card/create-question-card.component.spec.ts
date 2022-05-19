import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionCardComponent } from './create-question-card.component';

describe('CreateQuestionCardComponent', () => {
  let component: CreateQuestionCardComponent;
  let fixture: ComponentFixture<CreateQuestionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateQuestionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuestionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
