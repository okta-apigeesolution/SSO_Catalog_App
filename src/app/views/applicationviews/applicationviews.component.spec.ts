import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationviewsComponent } from './applicationviews.component';

describe('ApplicationviewsComponent', () => {
  let component: ApplicationviewsComponent;
  let fixture: ComponentFixture<ApplicationviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
