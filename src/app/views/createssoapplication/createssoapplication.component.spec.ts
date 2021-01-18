import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatessoapplicationComponent } from './createssoapplication.component';

describe('CreatessoapplicationComponent', () => {
  let component: CreatessoapplicationComponent;
  let fixture: ComponentFixture<CreatessoapplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatessoapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatessoapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
