import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostTemplateComponent } from './edit-post-template.component';

describe('EditPostTemplateComponent', () => {
  let component: EditPostTemplateComponent;
  let fixture: ComponentFixture<EditPostTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPostTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPostTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
