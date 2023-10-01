import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  agregarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  obtenerUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  eliminarUsuario(usuario: Usuario) {
    return this.http.delete(this.apiUrl + '/' + usuario.id);
  }
}
