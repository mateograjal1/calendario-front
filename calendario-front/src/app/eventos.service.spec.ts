import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from './eventos.model'; // Asegúrate de importar tu modelo de Evento

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = 'https://tu-api-rest.com/api/eventos'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  obtenerEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  obtenerEventoPorId(eventoId: number): Observable<Evento> {
    const url = `${this.apiUrl}/${eventoId}`;
    return this.http.get<Evento>(url);
  }

  guardarEvento(evento: Evento): Observable<Evento> {
    if (evento.id) {
      // Si el evento tiene un ID, actualízalo
      const url = `${this.apiUrl}/${evento.id}`;
      return this.http.put<Evento>(url, evento);
    } else {
      // Si el evento no tiene un ID, créalo
      return this.http.post<Evento>(this.apiUrl, evento);
    }
  }

  eliminarEvento(eventoId: number): Observable<void> {
    const url = `${this.apiUrl}/${eventoId}`;
    return this.http.delete<void>(url);
  }
}
