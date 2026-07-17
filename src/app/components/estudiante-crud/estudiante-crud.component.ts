import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';     
import { EstudianteService } from '../../services/estudiante.service';
import { Estudiante } from '../../models/estudiante.model';

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

  editando: boolean = false;
  matriculaBuscar: number | null = null;
  filtrado: boolean = false;

  constructor(private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.listar();
  }

  // OBTENER TODOS
  listar(): void {
    this.estudianteService.getEstudiantes().subscribe({
      next: (res) => this.estudiantes = res,
      error: (err) => console.error('Error al cargar estudiantes', err)
    });
  }

  // BUSCAR POR MATRÍCULA
  buscarPorMatricula(): void {
    if (!this.matriculaBuscar) {
      this.restaurarLista();
      return;
    }
    this.estudianteService.getEstudiantes(this.matriculaBuscar.toString()).subscribe({
      next: (res) => {
        this.estudiantes = res;
        this.filtrado = true;
      },
      error: (err) => {
        console.error(err);
        this.estudiantes = [];
        this.filtrado = true;
      }
    });
  }

  restaurarLista(): void {
    this.matriculaBuscar = null;
    this.filtrado = false;
    this.listar();
  }

  // GUARDAR O ACTUALIZAR
  guardar(): void {
    if (!this.estudianteForm.matricula || !this.estudianteForm.nombreCompleto || !this.estudianteForm.carrera) {
      alert('Por favor, llena todos los campos');
      return;
    }

    if (this.editando) {
      this.estudianteService.actualizarEstudiante(this.estudianteForm.matricula, this.estudianteForm).subscribe({
        next: () => {
          alert('Estudiante actualizado con éxito');
          this.limpiarFormulario();
          this.listar();
        },
        error: (err) => console.error('Error al actualizar', err)
      });
    } else {
      this.estudianteService.crearEstudiante(this.estudianteForm).subscribe({
        next: () => {
          alert('Estudiante registrado con éxito');
          this.limpiarFormulario();
          this.listar();
        },
        error: (err) => alert(err.error?.detail || 'La matrícula ya existe o hay un error')
      });
    }
  }

  // Mapear los datos al formulario para editar
  seleccionarParaEditar(estudiante: Estudiante): void {
    this.estudianteForm = { ...estudiante };
    this.editando = true;
  }

  // ELIMINAR
  eliminar(matricula: number): void {
    if (confirm('¿Estás seguro de eliminar este estudiante?')) {
      this.estudianteService.eliminarEstudiante(matricula).subscribe({
        next: () => {
          alert('Estudiante eliminado');
          this.listar();
        },
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  limpiarFormulario(): void {
    this.estudianteForm = { matricula: null, nombreCompleto: '', carrera: '' };
    this.editando = false;
  }
}