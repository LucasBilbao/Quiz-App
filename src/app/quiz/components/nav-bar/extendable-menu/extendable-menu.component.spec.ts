import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendableMenuComponent } from './extendable-menu.component';

describe('ExtendableMenuComponent', () => {
  let component: ExtendableMenuComponent;
  let fixture: ComponentFixture<ExtendableMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendableMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendableMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
