import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GunItemComponent } from './gun-item.component';

describe('GunItemComponent', () => {
  let component: GunItemComponent;
  let fixture: ComponentFixture<GunItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GunItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GunItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
