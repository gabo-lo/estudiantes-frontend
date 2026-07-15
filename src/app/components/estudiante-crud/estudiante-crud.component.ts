import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- IMPORTANTE para los inputs
import { Estudiante } from '../../models/estudiante.model';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-estudiante-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estudiante-crud.component.html',
  styleUrls: ['./estudiante-crud.component.css']
})
export class EstudianteCrudComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  
 
  estudianteForm: any = {
  matricula: null,
  nombreCompleto: '',
  carrera: ''
};

  editando: boolean = false; // Bandera para saber si registramos o editamos

  constructor(private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.estudianteService.getEstudiantes().subscribe({
      next: (res) => this.estudiantes = res,
      error: (err) => console.error('Error al obtener datos', err)
    });
  }

  guardar(): void {
    if (this.editando) {
      // Actualizar registro existente
      this.estudianteService.actualizarEstudiante(this.estudianteForm.matricula, this.estudianteForm).subscribe({
        next: () => {
          this.listar();
          this.limpiarFormulario();
        },
        error: (err) => console.error(err)
      });
    } else {
      // Crear nuevo registro (recuerda que la matrícula debe tener 10 dígitos)
      this.estudianteService.crearEstudiante(this.estudianteForm).subscribe({
        next: () => {
          this.listar();
          this.limpiarFormulario();
        },
        error: (err) => alert('Error al registrar. Revisa que la matrícula tenga 10 dígitos.')
      });
    }
  }

  seleccionarParaEditar(e: Estudiante): void {
    this.estudianteForm = { ...e }; // Clonamos el objeto
    this.editando = true;
  }

  eliminar(matricula: number): void {
    if (confirm('¿Estás seguro de eliminar este estudiante?')) {
      this.estudianteService.eliminarEstudiante(matricula).subscribe({
        next: () => this.listar(),
        error: (err) => console.error(err)
      });
    }
  }

  limpiarFormulario(): void {
  this.estudianteForm = { 
    matricula: null, 
    nombreCompleto: '', 
    carrera: '' 
  };
  this.editando = false;
}
}