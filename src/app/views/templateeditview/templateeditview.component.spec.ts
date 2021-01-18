import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateeditviewComponent } from './templateeditview.component';

describe('TemplateeditviewComponent', () => {
  let component: TemplateeditviewComponent;
  let fixture: ComponentFixture<TemplateeditviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateeditviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateeditviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
