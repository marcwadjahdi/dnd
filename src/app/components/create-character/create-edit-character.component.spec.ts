import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCharacterComponent } from './create-edit-character.component';

describe('CreateCharacterComponent', () => {
  let component: CreateEditCharacterComponent;
  let fixture: ComponentFixture<CreateEditCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditCharacterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
