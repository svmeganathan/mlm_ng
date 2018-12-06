import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiedUsersComponent } from './modified-users.component';

describe('ModifiedUsersComponent', () => {
  let component: ModifiedUsersComponent;
  let fixture: ComponentFixture<ModifiedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifiedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifiedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
