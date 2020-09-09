import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IspisNarudzbiComponent } from './ispis-narudzbi.component';

describe('IspisNarudzbiComponent', () => {
  let component: IspisNarudzbiComponent;
  let fixture: ComponentFixture<IspisNarudzbiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IspisNarudzbiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IspisNarudzbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
