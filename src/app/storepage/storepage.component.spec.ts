import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorepageComponent } from './storepage.component';

describe('StorepageComponent', () => {
  let component: StorepageComponent;
  let fixture: ComponentFixture<StorepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorepageComponent]
    });
    fixture = TestBed.createComponent(StorepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
