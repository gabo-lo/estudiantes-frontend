import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EstudianteCrudComponent } from './components/estudiante-crud/estudiante-crud.component'; // <-- IMPORTAR

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EstudianteCrudComponent], // <-- AGREGAR AQUÍ
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'estudiantes-frontend';
}