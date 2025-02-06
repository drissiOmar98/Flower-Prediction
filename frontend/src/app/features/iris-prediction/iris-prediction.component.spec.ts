import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrisPredictionComponent } from './iris-prediction.component';

describe('IrisPredictionComponent', () => {
  let component: IrisPredictionComponent;
  let fixture: ComponentFixture<IrisPredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IrisPredictionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IrisPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
