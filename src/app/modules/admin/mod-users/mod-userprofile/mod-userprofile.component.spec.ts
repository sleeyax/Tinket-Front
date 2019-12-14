import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModUserprofileComponent } from './mod-userprofile.component';

describe('ModUserprofileComponent', () => {
  let component: ModUserprofileComponent;
  let fixture: ComponentFixture<ModUserprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModUserprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModUserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
