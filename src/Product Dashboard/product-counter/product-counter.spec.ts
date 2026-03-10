import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCounter } from './product-counter';

describe('ProductCounter', () => {
  let component: ProductCounter;
  let fixture: ComponentFixture<ProductCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCounter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCounter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
