import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnetNowComponent } from './connet-now.component';

describe('ConnetNowComponent', () => {
  let component: ConnetNowComponent;
  let fixture: ComponentFixture<ConnetNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnetNowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnetNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
