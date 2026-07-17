import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private apiUrl = 'http://localhost:8080/api/estudiantes';

  constructor(private http: HttpClient) { }

 // Burcar estudiante
 getEstudiantes(buscar?: string): Observable<Estudiante[]> {
  let params = new HttpParams();
  if (buscar) {
    params = params.set('buscar', buscar);
  }
  return this.http.get<Estudiante[]>(this.apiUrl, { params });
}

  // Crear uno nuevo
  crearEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.apiUrl, estudiante);
  }

  // Actualizar uno existente
  actualizarEstudiante(matricula: number, estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.apiUrl}/${matricula}`, estudiante);
  }

  // Eliminar por matrícula
  eliminarEstudiante(matricula: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${matricula}`);
  }
}