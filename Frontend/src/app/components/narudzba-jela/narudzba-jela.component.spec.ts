import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NarudzbaJelaComponent } from './narudzba-jela.component';

describe('NarudzbaJelaComponent', () => {
  let component: NarudzbaJelaComponent;
  let fixture: ComponentFixture<NarudzbaJelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NarudzbaJelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NarudzbaJelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
