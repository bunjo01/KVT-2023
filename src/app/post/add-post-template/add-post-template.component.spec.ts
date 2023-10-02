import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostTemplateComponent } from './add-post-template.component';

describe('AddPostTemplateComponent', () => {
  let component: AddPostTemplateComponent;
  let fixture: ComponentFixture<AddPostTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPostTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
