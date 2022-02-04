import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicedialogComponent } from './servicedialog.component';

describe('ServicedialogComponent', () => {
  let component: ServicedialogComponent;
  let fixture: ComponentFixture<ServicedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicedialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
