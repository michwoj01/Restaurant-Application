import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishaddComponent } from './dishadd.component';

describe('DishaddComponent', () => {
  let component: DishaddComponent;
  let fixture: ComponentFixture<DishaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
