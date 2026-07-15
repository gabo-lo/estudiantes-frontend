import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteCrudComponent } from './estudiante-crud.component';

describe('EstudianteCrudComponent', () => {
  let component: EstudianteCrudComponent;
  let fixture: ComponentFixture<EstudianteCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudianteCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstudianteCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
