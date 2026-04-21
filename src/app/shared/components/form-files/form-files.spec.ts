import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFiles } from './form-files';

describe('FormFiles', () => {
  let component: FormFiles;
  let fixture: ComponentFixture<FormFiles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFiles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFiles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
