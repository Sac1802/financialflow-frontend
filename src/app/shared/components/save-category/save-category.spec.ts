import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCategory } from './save-category';

describe('SaveCategory', () => {
  let component: SaveCategory;
  let fixture: ComponentFixture<SaveCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveCategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
