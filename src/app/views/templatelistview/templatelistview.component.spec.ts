import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatelistviewComponent } from './templatelistview.component';

describe('TemplatelistviewComponent', () => {
  let component: TemplatelistviewComponent;
  let fixture: ComponentFixture<TemplatelistviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatelistviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatelistviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
